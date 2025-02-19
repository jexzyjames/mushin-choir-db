import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa6";
import btriad from "../assets/basic-triads.svg";
import triad from "../assets/triads-the-4-types.svg";
import keytriads from "../assets/key-triads.svg";
import inversions from "../assets/inversion.svg";
import exampletriad from "../assets/example-triad.svg";
import { useNavigate } from "react-router-dom";
import { getgradeAssignment, getgradesLessons } from "../redux/slices/gradeContentSlice";
import { useSelector,useDispatch } from "react-redux";
const Lessons = ({ title }) => {
  const assignments = useSelector((state) => state.gradeContent.gradeData);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const grade = user?.grade
  const[loading, setLoading] = useState(false);
const getGradeLesson = async ()=>{
setLoading(false)
  dispatch(getgradesLessons(user?.grade));
}
  useEffect(() => {
    setLoading(true)
    getGradeLesson()
  }, [ loading]);

  return (

    
      <>
      {loading ?  <div className="text-center text-xl">loading ...</div>
      : 
    <div className=" h-full">
      <div className=" ">
        <div className="flex bg-white mb-1 shadow-lg rounded-xl p-2  gap-1 items-center">
          <FaList />
          <h2 className="font-mono font-bold ">{title} {grade}</h2>
        </div>

        {assignments?.lessons && assignments.lessons.length > 0 ? assignments.lessons.map((assignment) => (
         <div className="bg-neutral-100 mb-2 p-2 md:p-4 rounded-xl shadow-lg ">
         <h1 className="text-2xl  text-amber-800 font-extrabold text-left">
           TRIADS
         </h1>
         <p className="mb-3 text-[13px] md:w-full md:text-md font-bold  ">
           A triad consists of three notes stacked in consecutive thirds. A
           triad is also called a chord as well as a harmony. (Harmony also
           refers to chord progressions.) The lowest note of a triad when it is
           stacked in thirds is called the root. The middle note is the third
           and the highest note of the triad is the fifth. (We will discuss
           inversions of triads later.)
         </p>

         <p className="mb-3 text-[13px]  md:w-full md:text-md font-bold ">
           Major and minor triads are common, diminished triads are less
           common, and augmented triads are rare.
         </p>

         <img
           className="rounded-lg  mt-2 md:w-full shadow-md"
           src={triad}
           alt=""
         />
                              
         <img
           className="md:w-full  rounded-lg shadow-md p-1 "
           src={btriad}
           alt=""
         />

         <h1 className="text-2xl md:w-full  text-amber-800 mt-3 font-extrabold text-left">
          {assignment.title}
         </h1>

         <p className="mb-3 text-[13px]  md:w-full md:text-md font-bold  ">
           {assignment.content}
         </p>

         <img
           className="w-full rounded-lg shadow-md p-1 "
           src={keytriads}
           alt=""
         />

         <h1 className="text-2xl  text-amber-800  mt-2 font-extrabold text-left">
           TRIADS INVERSIONS
         </h1>

         <p>
        {assignment.content}
         </p>

         <img
           className="w-full rounded-lg shadow-md p-1 "
           src={inversions}
           alt=""
         />
       </div>
       
       
       
        )
      )
       : <h1 className="text-center text-2xl text-amber-800 font-extrabold">No lessons available</h1>
    }

        
      </div>
      </div>
      }
      </>
  
  );
};

export default Lessons;
