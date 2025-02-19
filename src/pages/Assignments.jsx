import React , {useEffect,useState}from "react";
import { FaBook } from "react-icons/fa6";
import btriad from "../assets/basic-triads.svg";
import triad from "../assets/triads-the-4-types.svg";
import ass1 from "../assets/ass-1.svg";
import { useSelector, useDispatch } from 'react-redux';
import { getgradesLessons } from "../redux/slices/gradeContentSlice";
import GradeContentForm from "../components/GradeContentForm";
const Assignments = ({ title  }) => {

const {items} = useSelector(state=>state.auth)
const user = useSelector((state) => state.auth.user)
const assignments = useSelector((state) => state.gradeContent.gradeData)
    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch((getgradesLessons(user?.grade)))
        
    },[user?.grade])






  return (
    <div>
      <div className="w-[100%] ">
        <div className="flex bg-white mb-1 shadow-lg rounded-xl p-2  gap-1 items-center">
          <FaBook />
          <h2 className="font-mono font-bold ">{title} {user?.grade}  </h2>
        </div>
 {assignments?.assignments && assignments.assignments.length > 0 ? assignments.assignments.map((assignment) => (
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
           src={btriad}
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
           src={btriad}
           alt=""
         />
       </div>
       
       
       
        )
      )
       : <h1 className="text-center text-2xl text-amber-800 font-extrabold">No lessons available</h1>
    }
        <div className="bg-neutral-100 mb-2 p-4 rounded-xl shadow-lg ">
          {/* <GradeContentForm/> */}
      
          <p className="mb-3 text-md font-bold  ">
            
          </p>

          <p className="mb-3 text-md font-bold  ">
            
          </p>
                              


          <form className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg-black shadow-black "   action="">

          </form>

         
            
                    <div  className='bg-white ' >
                    {status === 'loading' && <p>Posting assignment...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
     {items && 
     items.map((data,i)=>(
       <div key={i} className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg-black shadow-black mb-2 p-4 gap-1">
       <p><strong>Tittle:</strong> {data.title}</p>
       <p><strong>Content:</strong> {data.content}</p>
       <p><strong>Grade:</strong> {data.grade}</p>

       </div>
     ))
    }
        
                    
          <h1 className="text-2xl  text-amber-800 font-extrabold text-center">
           
          </h1>

          <p>
      
          </p>

          </div>

                
          <img src={ass1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Assignments;
