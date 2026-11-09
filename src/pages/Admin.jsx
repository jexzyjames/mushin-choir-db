import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FaBold,
  FaBookOpen,
  FaItalic,
  FaListCheck,
  FaMusic,
  FaTable,
} from "react-icons/fa6";
import {
  postGradeAssignment,
  postGradeLesson,
  updateGradeContent,
} from "../redux/slices/adminSlice";
import { getgradesLessons } from "../redux/slices/gradeContentSlice";
import { deleteUser, fetchUsers } from "../redux/slices/userSlice";
import { sanitizeRichText } from "../utils/sanitizeRichText";

const grades = ["PRELIM", "GRADE 1", "GRADE 2", "GRADE 3", "GRADE 4", "GRADE 5"];

const fieldClass =
  "mt-2 block w-full min-w-0 border border-[#C9A24B]/25 bg-[#0F0805] px-3 py-3 text-sm text-[#F5EBD8] outline-none transition-colors placeholder:text-[#7A6A4E] focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20";
const labelClass =
  "block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A24B]";

function AdminPanel() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.user);
  const gradeData = useSelector((state) => state.gradeContent.gradeData);
  const gradeStatus = useSelector((state) => state.gradeContent.status);
  const users = useSelector((state) => state.users.items);
  const usersStatus = useSelector((state) => state.users.status);
  const usersError = useSelector((state) => state.users.error);
  const [grade, setGrade] = useState("");
  const [contentType, setContentType] = useState("assignment");
  const [activeTab, setActiveTab] = useState("content");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmingUser, setConfirmingUser] = useState("");
  const [deletingUser, setDeletingUser] = useState("");

  useEffect(() => {
    if (!grade) return;
    dispatch(getgradesLessons(grade))
      .unwrap()
      .catch((error) => {
        toast.error(typeof error === "string" ? error : "Grade content could not be loaded.");
      });
  }, [dispatch, grade]);

  useEffect(() => {
    if (activeTab !== "users") return;
    dispatch(fetchUsers())
      .unwrap()
      .catch((error) => {
        toast.error(typeof error === "string" ? error : "Users could not be loaded.");
      });
  }, [activeTab, dispatch]);

  const formatContent = (command, value) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    if (command === "table") {
      document.execCommand(
        "insertHTML",
        false,
        '<table><thead><tr><th>Heading 1</th><th>Heading 2</th></tr></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table><p><br></p>'
      );
    } else {
      document.execCommand(command, false, value);
    }

    setContent(editor.innerHTML);
    setContentLength(editor.innerText.length);
  };

  const handleContentInput = (event) => {
    const editor = event.currentTarget;
    setContent(editor.innerHTML);
    setContentLength(editor.innerText.length);
  };

  const resetEditor = () => {
    setEditing(null);
    setTitle("");
    setContent("");
    setContentLength(0);
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const handleEdit = (item, index, type) => {
    const safeContent = sanitizeRichText(item.content || "");
    const textContainer = document.createElement("div");
    textContainer.innerHTML = safeContent;
    setEditing({ index });
    setContentType(type);
    setTitle(item.title || "");
    setContent(safeContent);
    setContentLength(textContainer.innerText.length);
    if (editorRef.current) editorRef.current.innerHTML = safeContent;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteUser = async (user) => {
    const uid = user.uid || user.id;
    setDeletingUser(user.id);
    try {
      await dispatch(deleteUser({ uid, profileId: user.id })).unwrap();
      toast.success(`${user.name || "User"}'s account was deleted.`);
      setConfirmingUser("");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "The user account could not be deleted.");
    } finally {
      setDeletingUser("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const editorText = editorRef.current?.innerText.trim() || "";
    if (!grade || !title.trim() || !editorText) {
      toast.error("Choose a grade and enter a title and content before publishing.");
      return;
    }
    if (editorText.length > 10000) {
      toast.error("Content must be 10,000 characters or fewer.");
      return;
    }

    setLoading(true);

    const contentData = {
      title: title.trim(),
      content: sanitizeRichText(editorRef.current?.innerHTML ?? content),
      ...(editing
        ? { updatedAt: new Date().toISOString() }
        : { id: `${Date.now()}`, createdAt: new Date().toISOString() }),
    };

    try {
      if (editing) {
        await dispatch(
          updateGradeContent({
            grade,
            contentType,
            contentIndex: editing.index,
            contentData,
          })
        ).unwrap();
        toast.success(`${contentType === "assignment" ? "Assignment" : "Lesson"} updated successfully.`);
      } else if (contentType === "assignment") {
        await dispatch(
          postGradeAssignment({ grade, assignmentData: contentData })
        ).unwrap();
        toast.success("Assignment posted successfully.");
      } else {
        await dispatch(
          postGradeLesson({ grade, lessonData: contentData })
        ).unwrap();
        toast.success("Lesson posted successfully.");
      }

      resetEditor();
      if (editing) dispatch(getgradesLessons(grade));
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Content could not be saved. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-3xl" aria-label="Admin management">
    <div className="mb-6 flex gap-2 border-b border-[#C9A24B]/20">
      {[
        { id: "content", label: "Lessons & assignments" },
        { id: "users", label: "Users" },
      ].map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          aria-pressed={activeTab === tab.id}
          className={`border-b-2 px-4 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
            activeTab === tab.id
              ? "border-[#C9A24B] text-[#C9A24B]"
              : "border-transparent text-[#B9A685] hover:text-[#F5EBD8]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>

    {activeTab === "content" ? (
      <div>
    <div className="mb-6 flex items-start gap-4 border border-[#C9A24B]/25 bg-[#150B07] p-5 sm:p-7">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#C9A24B]/40 text-[#C9A24B]">
          {contentType === "assignment" ? (
            <FaListCheck aria-hidden="true" />
          ) : (
            <FaBookOpen aria-hidden="true" />
          )}
        </span>
        <div className="min-w-0">
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#8B6F3C]">
            Share learning materials
          </p>
          <h2 id="create-content-title" className="font-display mt-2 break-words text-2xl font-semibold sm:text-3xl">
            {editing ? "Edit grade content" : "Create grade content"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#B9A685]">
            {editing
              ? "Update the lesson or assignment for choir members in this grade."
              : "Publish a lesson or assignment for choir members in a selected grade."}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="min-w-0 space-y-5 border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:p-8"
      >
        <div className="grid min-w-0 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Grade
            <select
              className={fieldClass}
              value={grade}
              onChange={(event) => {
                resetEditor();
                setGrade(event.target.value);
              }}
              required
              disabled={Boolean(editing)}
            >
              <option className="bg-[#150B07]" value="">Select a grade</option>
              {grades.map((option) => (
                <option className="bg-[#150B07]" key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClass}>
            Content type
            <select
              className={fieldClass}
              value={contentType}
              onChange={(event) => {
                resetEditor();
                setContentType(event.target.value);
              }}
              disabled={Boolean(editing)}
            >
              <option className="bg-[#150B07]" value="assignment">Assignment</option>
              <option className="bg-[#150B07]" value="lesson">Lesson</option>
            </select>
          </label>
        </div>

        <label className={labelClass}>
          Title
          <input
            className={fieldClass}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Introduction to rhythm"
            maxLength={120}
            required
          />
        </label>

        <div>
          <span className={labelClass}>Content</span>
          <div
            className="mt-2 flex flex-wrap gap-2 border border-[#C9A24B]/25 bg-[#0F0805] p-2"
            role="toolbar"
            aria-label="Content formatting"
          >
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => formatContent("bold")}
              className="flex h-10 w-10 items-center justify-center border border-[#C9A24B]/30 text-[#D9C9A8] hover:border-[#C9A24B] hover:text-[#C9A24B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A24B]"
              aria-label="Bold"
              title="Bold"
            >
              <FaBold aria-hidden="true" />
            </button>
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => formatContent("italic")}
              className="flex h-10 w-10 items-center justify-center border border-[#C9A24B]/30 text-[#D9C9A8] hover:border-[#C9A24B] hover:text-[#C9A24B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A24B]"
              aria-label="Italic"
              title="Italic"
            >
              <FaItalic aria-hidden="true" />
            </button>
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => formatContent("table")}
              className="flex h-10 items-center justify-center gap-2 border border-[#C9A24B]/30 px-3 font-sans text-xs text-[#D9C9A8] hover:border-[#C9A24B] hover:text-[#C9A24B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A24B]"
              aria-label="Insert table"
              title="Insert table"
            >
              <FaTable aria-hidden="true" />
              <span>Table</span>
            </button>
          </div>
          <div
            ref={editorRef}
            className={`${fieldClass} rich-editor min-h-48 whitespace-normal leading-7`}
            contentEditable
            role="textbox"
            aria-label="Lesson or assignment content"
            aria-multiline="true"
            aria-required="true"
            data-placeholder="Write content. Select text and use the toolbar to format it."
            onInput={handleContentInput}
            suppressContentEditableWarning
          />
          <span className={`mt-1 block text-right font-sans text-[10px] font-normal tracking-normal ${contentLength > 10000 ? "text-red-300" : "text-[#8B6F3C]"}`}>
            {contentLength.toLocaleString()} / 10,000 characters
          </span>
        </div>

        <button
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#C9A24B] bg-[#C9A24B] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#150B07] transition-colors hover:bg-transparent hover:text-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          type="submit"
          disabled={loading}
        >
          <FaMusic aria-hidden="true" />
          {loading
            ? editing ? "Saving…" : "Publishing…"
            : editing
              ? `Save ${contentType === "assignment" ? "assignment" : "lesson"}`
              : `Publish ${contentType === "assignment" ? "assignment" : "lesson"}`}
        </button>
        {editing && (
          <button
          type="button"
          onClick={resetEditor}
          className="ml-3 min-h-12 border border-[#C9A24B]/35 px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#D9C9A8] hover:border-[#C9A24B] hover:text-[#C9A24B]"
          >
          Cancel edit
          </button>
        )}
      </form>
      <section className="mt-8" aria-labelledby="existing-content-heading">
        <div className="mb-4">
          <h3 id="existing-content-heading" className="font-display text-xl font-semibold">
          Existing {contentType === "assignment" ? "assignments" : "lessons"}
          </h3>
          <p className="mt-1 text-sm text-[#B9A685]">
          Select an item to edit its title and formatted content.
          </p>
        </div>
        {!grade ? (
          <p className="border border-[#C9A24B]/20 bg-[#150B07] p-5 text-sm text-[#B9A685]">
          Select a grade above to manage its existing content.
          </p>
        ) : gradeStatus === "loading" && gradeData?.grade !== grade ? (
          <p className="border border-[#C9A24B]/20 bg-[#150B07] p-5 text-sm text-[#D9C9A8]" role="status">
          Loading grade content…
          </p>
        ) : (
          (() => {
          const items =
            gradeData?.grade === grade
              ? gradeData[contentType === "assignment" ? "assignments" : "lessons"] || []
              : [];
          return items.length ? (
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li
                  key={item.id || `${contentType}-${index}`}
                  className="flex flex-col gap-4 border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-[#F5EBD8]">{item.title || "Untitled"}</p>
                    <p className="mt-1 line-clamp-2 break-words text-sm text-[#B9A685]">
                      {item.content?.replace(/<[^>]*>/g, " ").trim() || "No content"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEdit(item, index, contentType)}
                    className="min-h-10 shrink-0 border border-[#C9A24B]/40 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#C9A24B] hover:bg-[#C9A24B]/10"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="border border-[#C9A24B]/20 bg-[#150B07] p-5 text-sm text-[#B9A685]">
              No {contentType === "assignment" ? "assignments" : "lessons"} have been posted for this grade.
            </p>
          );
          })()
        )}
      </section>
      </div>
      ) : (
        <section aria-labelledby="manage-users-heading">
          <div className="mb-5">
          <h2 id="manage-users-heading" className="font-display text-2xl font-semibold">
            Manage user accounts
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#B9A685]">
            Deleting an account permanently removes its Firebase sign-in and member profile.
          </p>
          </div>
          {usersStatus === "loading" ? (
          <p className="border border-[#C9A24B]/20 bg-[#150B07] p-5 text-sm text-[#D9C9A8]" role="status">
            Loading users…
          </p>
          ) : usersError && usersStatus === "failed" ? (
          <p className="border border-red-900/60 bg-[#1B0E08] p-5 text-sm text-red-200" role="alert">
            {usersError}
          </p>
          ) : users.length === 0 ? (
          <p className="border border-[#C9A24B]/20 bg-[#150B07] p-5 text-sm text-[#B9A685]">
            No user accounts were found.
          </p>
          ) : (
          <ul className="space-y-3">
            {users.map((user) => {
              const uid = user.uid || user.id;
              const isCurrentUser = uid === currentUser?.uid;
              return (
                <li
                  key={user.id}
                  className="flex flex-col gap-4 border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="min-w-0">
                    <p className="break-words font-semibold text-[#F5EBD8]">
                      {user.name || "Choir member"}{isCurrentUser ? " (you)" : ""}
                    </p>
                    <p className="mt-1 break-all text-sm text-[#B9A685]">{user.email || "No email listed"}</p>
                    {user.grade && (
                      <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.15em] text-[#8B6F3C]">
                        {user.grade}
                      </p>
                    )}
                  </div>
                  {isCurrentUser ? (
                    <span className="shrink-0 text-xs text-[#8B6F3C]">Current account</span>
                  ) : confirmingUser === user.id ? (
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <span className="mr-1 text-xs text-red-200">Permanently delete?</span>
                      <button
                        type="button"
                        disabled={deletingUser === user.id}
                        onClick={() => handleDeleteUser(user)}
                        className="min-h-10 border border-red-500/60 px-3 py-2 font-sans text-xs font-semibold uppercase text-red-200 hover:bg-red-950/50 disabled:opacity-50"
                      >
                        {deletingUser === user.id ? "Deleting…" : "Confirm"}
                      </button>
                      <button
                        type="button"
                        disabled={deletingUser === user.id}
                        onClick={() => setConfirmingUser("")}
                        className="min-h-10 border border-[#C9A24B]/30 px-3 py-2 font-sans text-xs uppercase text-[#D9C9A8]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingUser(user.id)}
                      className="min-h-10 shrink-0 border border-red-500/50 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-red-200 hover:bg-red-950/40"
                    >
                      Delete account
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          )}
        </section>
      )}
    </section>
  );
}

export default AdminPanel;
