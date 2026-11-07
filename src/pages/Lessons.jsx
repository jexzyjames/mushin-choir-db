import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBookOpen } from "react-icons/fa6";
import { getgradesLessons } from "../redux/slices/gradeContentSlice";

const Lessons = ({ title = "Lessons" }) => {
  const dispatch = useDispatch();
  const grade = useSelector((state) => state.auth.user?.grade);
  const lessons = useSelector(
    (state) => state.gradeContent.gradeData?.lessons ?? []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    let active = true;
    setPage(0);
    setError("");

    if (!grade) {
      setLoading(false);
      setError("Your account does not have a grade assigned yet.");
      return () => {
        active = false;
      };
    }

    setLoading(true);
    dispatch(getgradesLessons(grade))
      .unwrap()
      .catch((requestError) => {
        if (active) {
          setError(
            typeof requestError === "string"
              ? requestError
              : "Lessons could not be loaded. Please try again."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [dispatch, grade]);

  const lesson = lessons[page];

  return (
    <section aria-labelledby="lessons-heading">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center border border-[#C9A24B]/40 text-[#C9A24B]">
          <FaBookOpen aria-hidden="true" />
        </span>
        <div>
          <h2 id="lessons-heading" className="font-display text-2xl font-semibold">
            {title}
          </h2>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.16em] text-[#B9A685]">
            {grade || "Grade not set"}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="border border-[#C9A24B]/20 bg-[#150B07] p-6 text-sm text-[#D9C9A8]" role="status">
          Loading lessons…
        </p>
      ) : error ? (
        <p className="border border-red-900/60 bg-[#1B0E08] p-6 text-sm text-red-200" role="alert">
          {error}
        </p>
      ) : lessons.length === 0 ? (
        <p className="border border-[#C9A24B]/20 bg-[#150B07] p-6 text-sm text-[#B9A685]">
          No lessons have been posted for your grade yet.
        </p>
      ) : (
        <>
          <article className="border border-[#C9A24B]/25 bg-[#150B07] p-5 sm:p-7">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C9A24B]">
              Lesson {page + 1} of {lessons.length}
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold text-[#F5EBD8]">
              {lesson.title}
            </h3>
            <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-[#D9C9A8]">
              {lesson.content}
            </p>
          </article>
          {lessons.length > 1 && (
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((current) => current - 1)}
                className="border border-[#C9A24B]/40 px-4 py-2 font-sans text-xs uppercase tracking-[0.12em] text-[#D9C9A8] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="font-sans text-xs text-[#8B6F3C]" aria-live="polite">
                {page + 1} / {lessons.length}
              </span>
              <button
                type="button"
                disabled={page === lessons.length - 1}
                onClick={() => setPage((current) => current + 1)}
                className="border border-[#C9A24B]/40 px-4 py-2 font-sans text-xs uppercase tracking-[0.12em] text-[#D9C9A8] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Lessons;

Lessons.propTypes = {
  title: PropTypes.string,
};
