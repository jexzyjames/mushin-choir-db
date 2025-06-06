import React  from "react";
import { useNavigate,useParams } from "react-router-dom";
import { FaList, FaBook, FaUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = ({ title }) => {
  const navigate = useNavigate();
  const {id} =  useParams()
    const user = useSelector((state) => state.auth.user);
  
  return (
    <>
      <div className=" relative  bg-slate-50   ">
        <div className="grid md:grid-cols-3 gap-3 ">
          <div onClick={()=> navigate('/lessons')}
          className="bg-fuchsia-500 flex flex-row-reverse items-center gap-2  justify-between text-white rounded-md p-2 shadow-md ">
            <h1 className='justify-start text-left items-start font-extrabold' >LESSONS</h1>
            <FaList className="w-[40px] p-2 items-center flex justify-center h-[40px] text-green-500  bg-slate-50 rounded-[200px]"/>
            
            {/*  */}
          </div>

          <div onClick={()=> {
            navigate('/assignment')
            // window.location.hash = '/lessons'
          }} className="bg-fuchsia-500 cursor-pointer flex flex-row-reverse items-center gap-2  justify-between text-white rounded-md p-2 shadow-md ">
            <h1 className='justify-start text-left items-start font-extrabold' >ASSIGNMENT</h1>
            <FaBook className="w-[40px] p-2 items-center flex justify-center h-[40px] text-sky-600  bg-slate-50 rounded-[200px]"/>
            
            {/*  */}
          </div>

          <div onClick={()=> navigate(`/profile/${user?.uid}`)} className="bg-fuchsia-500 flex flex-row-reverse items-center gap-2  justify-between text-white rounded-md p-2 shadow-md ">
            <h1 className='justify-start text-left items-start font-extrabold' >PROFILE</h1>
            <FaUser className="w-[40px] p-2 items-center flex justify-center h-[40px] text-red-500  bg-slate-50 rounded-[200px]"/>
            
            {/*  */}
          </div>
         
        </div>
       
       
      </div>
    </>
  );
};

export default Dashboard;
