import React, {useState, useEffect} from 'react'
import {NavLink,useNavigate, Outlet} from 'react-router-dom'
import {
    FaDashcube,
    FaList,
    FaBook,
    FaUser,
    FaAddressBook,
  } from "react-icons/fa6";
  import { logoutUser } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { listenForAuthChanges } from "../redux/slices/authSlice";

const Hero = ({head, sethead}) => {
    const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const email = useSelector((state) => state.auth.user?.email);
  const name = useSelector((state) => state.auth.user.name);
  const grade = useSelector((state) => state.auth.user.grade);
  const age = useSelector((state) => state.auth.user.age);
  const group = useSelector((state) => state.auth.user.group);
  const part = useSelector((state) => state.auth.user.part);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, [dispatch, sethead, user,email, name, grade, age, group, part]);
  const logout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/login"));
  };

  return (
    <>
        <div className="bg-slate -10 md:w-full w-[100%]  h-screen     flex flex- m-0  md:flex  md:flex-row ">
        {/* NAVIGATIONS SECTION */}
        <div className="w-[15%]   rounded-md   justify-start flex  items-end justify-self-end p-2 md:w-[20%]">
          <div className="flex h-full justify-start items-start   flex-col  justify-self-end gap-2 md:gap-4 md:items-start w-full  ">
            <NavLink
              onClick={() => sethead("DASHBOARDSs")}
              to=''
              className={`flex gap-3 items-center  font-extrabold p-2`}
            >
              <p>
                <FaDashcube />
              </p>
              <p className=" hidden focus:visible  hover:w-full md:block">
                Dashboard
              </p>
            </NavLink>
            <NavLink
              to="lessons"
              onClick={() => sethead("LESSONS")}
              className="text-black flex gap-3 items-center font-extrabold   text-center  md:w-[100%]  p-2 cursor-pointer"
            >
              <p>
                <FaList />
              </p>
              <p className="hidden md:block ">Lessons</p>
            </NavLink>
            <NavLink
              to="assignment"
              onClick={() => sethead("ASSIGNMENTS")}
              className="font-extrabold flex  gap-3 items-center   text-center md:w-[100%] p-2 cursor-pointer"
            >
              <p>
                <FaBook />
              </p>
              <p className="hidden md:block">Assignment</p>
            </NavLink>

            <NavLink
              to={`profile/${user?.uid}`}
              onClick={() => sethead("PROFILE")}
              className="text-black font-extrabold flex gap-3 items-center text-center  md:w-[100%]  p-2 cursor-pointer"
            >
              <p>
                <FaAddressBook />
              </p>
              <p className="hidden md:block ">Profile</p>
            </NavLink>
            {user && 
           
            
            <NavLink
              to="logout"
              className="  flex gap-3 items-center font-extrabold text-black text-center md:w-[100%]  p-2 cursor-pointer"
            >
              <p>
                <FaUser />
              </p>
              <p className="hidden md:block ">Logout</p>
            </NavLink>
            }

          </div>
        </div>

        {/* OUTLET SECTION */}

        <div className="py-3 w-[100%]  flex-2 overflow-y-auto  flex-col  bg-white rounded-lg shadow-xl  md:col-span-3 m-0 px-[1%]">
          <div className="md:grid bg-blue-500 rounded-md  p-3  text-slate-50 mb-3">
            <div className="flex w-full font-bold justify-between p-1">

            <p >Welcome to your Dashboard, <b className='text-yellow-500'>{name} </b>  !</p>
           
           <p> Grade: <span className="text-yellow-400 rounded-sm p-2 " >{grade}</span> </p>
            </div>
            
          </div >
         
          <Outlet />

       


        </div>

        
      </div>
    </>
  )
}

export default Hero