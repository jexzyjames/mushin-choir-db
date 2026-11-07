import { useState } from "react";
import { useDispatch } from "react-redux";
import { postGradeAssignment, postGradeLesson } from "../redux/slices/adminSlice";

const grades = ["PRELIM", "GRADE 1", "GRADE 2", "GRADE 3", "GRADE 4", "GRADE 5"];

const fieldClass =
  "mt-2 w-full border border-[#C9A24B]/25 bg-[#0F0805] px-3 py-3 text-sm text-[#F5EBD8] outline-none transition-colors placeholder:text-[#7A6A4E] focus:border-[#C9A24B]";
const labelClass =
  "block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A24B]";

function AdminPanel() {
  const dispatch = useDispatch();
  const [grade, setGrade] = useState("");
  const [contentType, setContentType] = useState("assignment");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);

    const contentData = {
      id: `${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      if (contentType === "assignment") {
        await dispatch(
          postGradeAssignment({ grade, assignmentData: contentData })
        ).unwrap();
      } else {
        await dispatch(
          postGradeLesson({ grade, lessonData: contentData })
        ).unwrap();
      }

      setFeedback({
        type: "success",
        message: `${contentType === "assignment" ? "Assignment" : "Lesson"} posted successfully.`,
      });
      setTitle("");
      setContent("");
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          typeof error === "string"
            ? error
            : "Content could not be posted. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#8B6F3C]">
          Share learning materials
        </p>
        <h2 className="font-display mt-2 text-2xl font-semibold sm:text-3xl">
          Create grade content
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#B9A685]">
          Choose a grade and content type, then provide a clear title and lesson or assignment text.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 border border-[#C9A24B]/25 bg-[#150B07] p-5 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Grade
            <select
              className={fieldClass}
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
              required
            >
              <option className="bg-[#150B07]" value="">
                Select a grade
              </option>
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
              onChange={(event) => setContentType(event.target.value)}
            >
              <option className="bg-[#150B07]" value="assignment">
                Assignment
              </option>
              <option className="bg-[#150B07]" value="lesson">
                Lesson
              </option>
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

        <label className={labelClass}>
          Content
          <textarea
            className={`${fieldClass} min-h-48 resize-y`}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write the lesson or assignment details…"
            maxLength={10000}
            required
          />
        </label>

        {feedback && (
          <p
            className={`border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-[#C9A24B]/30 text-[#D9C9A8]"
                : "border-red-900/60 text-red-200"
            }`}
            role={feedback.type === "error" ? "alert" : "status"}
          >
            {feedback.message}
          </p>
        )}

        <button
          className="w-full border border-[#C9A24B] bg-[#C9A24B] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#150B07] transition-colors hover:bg-transparent hover:text-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Publishing…"
            : `Publish ${contentType === "assignment" ? "assignment" : "lesson"}`}
        </button>
      </form>
    </section>
  );
}

export default AdminPanel;
