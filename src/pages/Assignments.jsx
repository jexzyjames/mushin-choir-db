import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { getgradesLessons } from "../redux/slices/gradeContentSlice";
const Assignments = ({ title }) => {
  const { items } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const assignments = useSelector((state) => state.gradeContent.gradeData);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0)

  useEffect(() => {
    dispatch(getgradesLessons(user?.grade));
  }, [user?.grade]);

  return (
    <div>
      <div className="w-[100%]fades ">
        <div className="flex bg-white mb-1 shadow-lg rounded-xl p-2  gap-1 items-center">
          <FaBook />
          <h2 className="font-mono font-bold ">
            {title} {user?.grade}{" "}
          </h2>
        </div>
        {assignments?.assignments && assignments.assignments.length > 0 ? (
          assignments.assignments.map((assignment, index) => (
            <div key={assignment.id}  className={`${
              index !== page && "hidden"
            } bg-neutral-100 mb-2 p-2 md:p-4 rounded-xl shadow-lg`}>
              <h1 className="text-2xl md:w-full  text-amber-800 mt-3 font-extrabold text-left">
                {assignment.title}
              </h1>

        
              <p className="mb-3 text-[13px]  md:w-full md:text-md font-bold  " dangerouslySetInnerHTML={{ __html: assignment.content.replace(/\n/g, "<br>") }} />

            </div>
          ))
        ) : (
          <h1 className="text-center text-2xl text-amber-800 font-extrabold">
            No Assignments available
          </h1>
        )}

{assignments?.assignments && assignments.assignments.length > 0 ? (
              assignments.assignments.map((_, index) => (
                <button
                  className={` ${
                    index === page ? "bg-amber-700 text-black ease-in-out" : " "
                  } bg-slate-900 rounded-md gap-3 
                  text-white p-2 border justify-center items-center justify-self-end  
                  flex hover:bg-sky-600`}
                  key={index}
                  onClick={() => setPage(index)}
                >
                  {index}
                </button>

              
                  
              ))
            ) : (
              <></>
            )}
      </div>
    </div>
  );
};

export default Assignments;
