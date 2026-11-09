import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Bar, Pie } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { saveAs } from "file-saver";
import { FaDownload, FaFilter, FaUsers } from "react-icons/fa6";
import { db } from "../config/firebaseconfig";
import dummy from "../assets/dummy-img.jpeg";
import useTheme from "../context/useTheme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const fieldClass =
  "mt-2 block w-full min-w-0 border border-[#C9A24B]/25 bg-[#0F0805] px-3 py-3 text-sm text-[#F5EBD8] outline-none focus:border-[#C9A24B]";
const labelClass =
  "block min-w-0 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C9A24B]";
const Filter = () => {
  const { theme } = useTheme();
  const chartTextColor = theme === "light" ? "#51442F" : "#D9C9A8";
  const chartMutedColor = theme === "light" ? "#675B47" : "#B9A685";
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: chartTextColor } },
    },
    scales: {
      x: { ticks: { color: chartMutedColor }, grid: { color: "rgba(201, 162, 75, 0.2)" } },
      y: { ticks: { color: chartMutedColor }, grid: { color: "rgba(201, 162, 75, 0.2)" } },
    },
  };
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedPart, setSelectedPart] = useState("All");
  const [selectedUserGrade, setSelectedUserGrade] = useState("All");
  const [selectedLessonGrade, setSelectedLessonGrade] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let usersLoaded = false;
    let gradesLoaded = false;
    const finishInitialLoad = () => {
      if (usersLoaded && gradesLoaded) setLoading(false);
    };

    const unsubscribeUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        setUsers(snapshot.docs.map((userDoc) => ({ id: userDoc.id, ...userDoc.data() })));
        usersLoaded = true;
        finishInitialLoad();
      },
      () => {
        setError("Member data could not be loaded. Please try again later.");
        usersLoaded = true;
        finishInitialLoad();
      }
    );

    const unsubscribeGrades = onSnapshot(
      collection(db, "grades"),
      (snapshot) => {
        const allLessons = snapshot.docs.flatMap((gradeDoc) =>
          (gradeDoc.data().lessons || []).map((lesson, index) => ({
            ...lesson,
            id: lesson.id || `${gradeDoc.id}-${index}`,
            grade: gradeDoc.id,
          }))
        );
        setLessons(allLessons);
        gradesLoaded = true;
        finishInitialLoad();
      },
      () => {
        setError("Lesson data could not be loaded. Please try again later.");
        gradesLoaded = true;
        finishInitialLoad();
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeGrades();
    };
  }, []);

  const groups = useMemo(
    () => [...new Set(users.map((user) => user.group).filter(Boolean))].sort(),
    [users]
  );
  const parts = useMemo(
    () =>
      [
        ...new Set(
          users
            .filter((user) => selectedGroup === "All" || user.group === selectedGroup)
            .map((user) => user.part)
            .filter(Boolean)
        ),
      ].sort(),
    [users, selectedGroup]
  );
  const grades = useMemo(
    () => [...new Set(users.map((user) => user.grade).filter(Boolean))].sort(),
    [users]
  );
  const lessonGrades = useMemo(
    () => [...new Set(lessons.map((lesson) => lesson.grade).filter(Boolean))].sort(),
    [lessons]
  );
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          (selectedGroup === "All" || user.group === selectedGroup) &&
          (selectedPart === "All" || user.part === selectedPart) &&
          (selectedUserGrade === "All" || user.grade === selectedUserGrade)
      ),
    [users, selectedGroup, selectedPart, selectedUserGrade]
  );
  const filteredLessons = useMemo(
    () =>
      lessons.filter(
        (lesson) =>
          selectedLessonGrade === "All" || lesson.grade === selectedLessonGrade
      ),
    [lessons, selectedLessonGrade]
  );

  const gradeCounts = filteredUsers.reduce((counts, user) => {
    const grade = user.grade || "Unassigned";
    counts[grade] = (counts[grade] || 0) + 1;
    return counts;
  }, {});
  const partCounts = filteredUsers.reduce((counts, user) => {
    const part = user.part || "Unassigned";
    counts[part] = (counts[part] || 0) + 1;
    return counts;
  }, {});

  const barChartData = {
    labels: Object.keys(gradeCounts),
    datasets: [
      {
        label: "Members",
        data: Object.values(gradeCounts),
        backgroundColor: "rgba(201, 162, 75, 0.65)",
        borderColor: "#C9A24B",
        borderWidth: 1,
      },
    ],
  };
  const pieChartData = {
    labels: Object.keys(partCounts),
    datasets: [
      {
        label: "Members",
        data: Object.values(partCounts),
        backgroundColor: ["#C9A24B", "#5A1E12", "#8B6F3C", "#D9C9A8", "#704B32"],
        borderColor: theme === "light" ? "#FFFFFF" : "#150B07",
        borderWidth: 2,
      },
    ],
  };

  const exportCSV = () => {
    const escapeCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const rows = [
      ["Name", "Email", "Group", "Part", "Grade", "Date of birth"],
      ...filteredUsers.map((user) => [
        user.name,
        user.email,
        user.group,
        user.part,
        user.grade,
        user.age,
      ]),
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(escapeCell).join(",")).join("\r\n")}`;
    saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "choir-members.csv");
  };

  return (
    <section className="w-full min-w-0 space-y-5" aria-labelledby="admin-dashboard-title">
      <header className="flex min-w-0 items-start gap-4 border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:p-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C9A24B]/40 text-[#C9A24B]">
          <FaUsers aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#8B6F3C]">
            Choir management
          </p>
          <h2 id="admin-dashboard-title" className="font-display mt-2 break-words text-2xl font-semibold sm:text-3xl">
            Members &amp; learning overview
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#B9A685]">
            Filter member records, view grade lessons and export the current member list.
          </p>
        </div>
      </header>

      {error && (
        <p className="break-words border border-red-900/60 bg-[#1B0E08] px-4 py-3 text-sm text-red-200" role="alert">
          {error}
        </p>
      )}

      <div className="min-w-0 border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-[#C9A24B]">
          <FaFilter aria-hidden="true" />
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em]">
            Filters
          </h3>
        </div>
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className={labelClass}>
            Member group
            <select className={fieldClass} value={selectedGroup} onChange={(event) => {
              setSelectedGroup(event.target.value);
              setSelectedPart("All");
            }}>
              <option className="bg-[#150B07]" value="All">All groups</option>
              {groups.map((group) => (
                <option className="bg-[#150B07]" key={group} value={group}>{group}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Member part
            <select className={fieldClass} value={selectedPart} onChange={(event) => setSelectedPart(event.target.value)}>
              <option className="bg-[#150B07]" value="All">All parts</option>
              {parts.map((part) => (
                <option className="bg-[#150B07]" key={part} value={part}>{part}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Member grade
            <select className={fieldClass} value={selectedUserGrade} onChange={(event) => setSelectedUserGrade(event.target.value)}>
              <option className="bg-[#150B07]" value="All">All grades</option>
              {grades.map((grade) => (
                <option className="bg-[#150B07]" key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Lesson grade
            <select className={fieldClass} value={selectedLessonGrade} onChange={(event) => setSelectedLessonGrade(event.target.value)}>
              <option className="bg-[#150B07]" value="All">All grades</option>
              {lessonGrades.map((grade) => (
                <option className="bg-[#150B07]" key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <article className="border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:p-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#8B6F3C]">Filtered members</p>
          <p className="font-display mt-2 text-3xl font-semibold text-[#F5EBD8]" aria-live="polite">
            {loading ? "…" : filteredUsers.length}
          </p>
        </article>
        <article className="border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:p-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#8B6F3C]">Filtered lessons</p>
          <p className="font-display mt-2 text-3xl font-semibold text-[#F5EBD8]" aria-live="polite">
            {loading ? "…" : filteredLessons.length}
          </p>
        </article>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <article className="min-w-0 border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:p-5">
          <h3 className="font-display mb-4 text-xl font-semibold">Members by grade</h3>
          <div className="relative h-64 min-w-0">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </article>
        <article className="min-w-0 border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:p-5">
          <h3 className="font-display mb-4 text-xl font-semibold">Members by choir part</h3>
          <div className="relative mx-auto h-64 min-w-0 max-w-sm">
            <Pie data={pieChartData} options={{ ...chartOptions, scales: undefined }} />
          </div>
        </article>
      </div>

      <section className="min-w-0 border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:p-5" aria-labelledby="members-table-heading">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 id="members-table-heading" className="font-display text-xl font-semibold">Choir members</h3>
            <p className="mt-1 text-xs text-[#B9A685]">Showing {filteredUsers.length} member{filteredUsers.length === 1 ? "" : "s"}</p>
          </div>
          <button
            type="button"
            onClick={exportCSV}
            disabled={filteredUsers.length === 0}
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#C9A24B]/50 px-4 py-2 font-sans text-xs uppercase tracking-[0.12em] text-[#C9A24B] transition-colors hover:bg-[#C9A24B] hover:text-[#150B07] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaDownload aria-hidden="true" />
            Export CSV
          </button>
        </div>
        <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-y border-[#C9A24B]/20 font-sans text-[10px] uppercase tracking-[0.12em] text-[#C9A24B]">
                <th scope="col" className="px-3 py-3">Member</th>
                <th scope="col" className="px-3 py-3">Group</th>
                <th scope="col" className="px-3 py-3">Part</th>
                <th scope="col" className="px-3 py-3">Grade</th>
                <th scope="col" className="px-3 py-3">Date of birth</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-[#C9A24B]/10 text-[#D9C9A8]">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <img className="h-9 w-9 shrink-0 rounded-full border border-[#C9A24B]/30 object-cover" src={user.imageUrl || dummy} alt="" loading="lazy" />
                      <div className="min-w-0">
                        <p className="break-words font-medium text-[#F5EBD8]">{user.name || "Unnamed member"}</p>
                        <p className="break-all text-xs text-[#8B6F3C]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">{user.group || "—"}</td>
                  <td className="px-3 py-3">{user.part || "—"}</td>
                  <td className="px-3 py-3">{user.grade || "—"}</td>
                  <td className="px-3 py-3">{user.age || "—"}</td>
                </tr>
              ))}
              {!loading && filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-sm text-[#B9A685]">
                    No members match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="min-w-0 border border-[#C9A24B]/25 bg-[#150B07] p-4 sm:p-5" aria-labelledby="lessons-table-heading">
        <h3 id="lessons-table-heading" className="font-display mb-4 text-xl font-semibold">Grade lessons</h3>
        <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-y border-[#C9A24B]/20 font-sans text-[10px] uppercase tracking-[0.12em] text-[#C9A24B]">
                <th scope="col" className="px-3 py-3">Title</th>
                <th scope="col" className="px-3 py-3">Content</th>
                <th scope="col" className="px-3 py-3">Grade</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id} className="border-b border-[#C9A24B]/10 text-[#D9C9A8]">
                  <td className="max-w-48 break-words px-3 py-3 font-medium text-[#F5EBD8]">{lesson.title}</td>
                  <td className="max-w-sm whitespace-pre-wrap break-words px-3 py-3">{lesson.content}</td>
                  <td className="px-3 py-3">{lesson.grade}</td>
                </tr>
              ))}
              {!loading && filteredLessons.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-8 text-center text-sm text-[#B9A685]">
                    No lessons match the selected grade.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Filter;
