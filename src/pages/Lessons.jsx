import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa6";
import { getgradesLessons } from "../redux/slices/gradeContentSlice";
import { useSelector, useDispatch } from "react-redux";
const Lessons = ({ title }) => {
  const assignments = useSelector((state) => state.gradeContent.gradeData);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const grade = user?.grade;
  const [loading, setLoading] = useState(false);
  const getGradeLesson = async () => {
    setLoading(false);
    dispatch(getgradesLessons(user?.grade));
  };
  useEffect(() => {
    setLoading(true);
    getGradeLesson();
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="text-center text-xl">loading ...</div>
      ) : (
        <div className=" h-full">
          <div className=" ">
            <div className="flex bg-white mb-1 shadow-lg rounded-xl p-2  gap-1 items-center">
              <FaList />
              <h2 className="font-mono font-bold ">
                {title} {grade}
              </h2>
            </div>

            {assignments?.lessons && assignments.lessons.length > 0 ? (
              assignments.lessons.map((lessons) => (
                <div className="bg-neutral-100 mb-2 p-2 md:p-4 rounded-xl shadow-lg ">
                  <h1 className="text-2xl md:w-full  text-amber-800 mt-3 font-extrabold text-left">
                    {lessons.title}
                  </h1>

                  <p className="mb-3 text-[13px]  md:w-full md:text-md font-bold  ">
                    {lessons.content}
                  </p>
                </div>
              ))
            ) : (
              <h1 className="text-center text-2xl text-amber-800 font-extrabold">
                No lessons available
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Lessons;
