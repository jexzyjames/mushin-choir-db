import React, { useEffect, useState } from "react";
import {
  FaDashcube,
  FaList,
  FaBook,
  FaUser,
  FaAddressBook,
} from "react-icons/fa6";
import ProfileImage from "../components/ProfileImage";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import image from "../assets/reg-img.png";
import logo from "../assets/logos.png";
import { logoutUser } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { listenForAuthChanges } from "../redux/slices/authSlice";
const Dashboard = ({ title }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const email = useSelector((state) => state.auth.user?.email);
  const name = useSelector((state) => state.auth.user.name);
  const grade = useSelector((state) => state.auth.user.grade);
  const age = useSelector((state) => state.auth.user.age);
  const group = useSelector((state) => state.auth.user.group);
  const part = useSelector((state) => state.auth.user.part);

  const dispatch = useDispatch();
  const [head, sethead] = useState("DASHBOARD");
  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, [dispatch, sethead, user,email, name, grade, age, group, part]);
  const logout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/login"));
  };

  const Logo = (
    <span>
      <Link className="flex gap-[2px]" to="/">
        <img className=" w-10 h-10" src={logo} alt="" />
      </Link>
    </span>
  );
  return (
    <div className=" relative  bg-red-300   ">
      <div className="grid grid-cols-6 items-center overflow-hidden  w-full md:grid-cols-6 px-[1%] md:px-[1%] py-2 ">
        <div className=" m-0 p-0 ">{Logo}</div>

        <div className="col-span-3 w-full md:col-span-4 m-0 p-0 ">
          <h1 className="md:text-2xl text-left   text-[16px]  font-extrabold font-mono">
            {head}
          </h1>
        </div>

        <div className="flex   col-span-2 md:col-span-1 ">
          <div className="md:flex-row flex gap-2 items-center grid-cols-2 md:flex m-0  md:gap-2">
            <img
              className="rounded-[200px] w-8 h-8 bg-cover bg-center bg-slate-950  border-green-300 p-1  "
              src={image}
              alt="user"
            />
            {/* <ProfileImage userId={user?.uid} /> */}
            <p>{name} </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}

      <div className="bg-slate -10 md:w-full w-[100%]  h-screen  gap-1    md:gap-1  flex flex- m-0  md:px-[1%] md:flex  md:flex-row ">
        {/* NAVIGATIONS SECTION */}
        <div className="w-[15%] bg-slate-950  rounded-md   justify-start flex  items-end justify-self-end p-2 md:w-[20%]">
          <div className="flex h-full justify-start items-start  flex-col p-2 justify-self-end gap-2 md:gap-4 md:items-start  w-[100%]">
            <NavLink
              onClick={() => sethead("DASHBOARD")}
              to=""
              className=" flex items-center  gap-2  bg-slate-200 text-center  md:w-[100%] rounded-[15px] p-2 text-black cursor-pointer"
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
              className="text-black flex gap-1 items-center font-extrabold  bg-slate-200 text-center  md:w-[100%] rounded-[15px] p-2 cursor-pointer"
            >
              <p>
                <FaList />
              </p>
              <p className="hidden md:block ">Lessons</p>
            </NavLink>
            <NavLink
              to="assignment"
              onClick={() => sethead("ASSIGNMENTS")}
              className="font-extrabold flex  gap-1 items-center  bg-slate-200 text-center md:w-[100%] rounded-[15px] p-2 cursor-pointer"
            >
              <p>
                <FaBook />
              </p>
              <p className="hidden md:block">Assignment</p>
            </NavLink>

            <NavLink
              to={`profile/${user?.uid}`}
              onClick={() => sethead("PROFILE")}
              className="text-black font-extrabold  bg-slate-200 flex gap-1 items-center text-center  md:w-[100%] rounded-[15px] p-2 cursor-pointer"
            >
              <p>
                <FaAddressBook />
              </p>
              <p className="hidden md:block ">Profile</p>
            </NavLink>
            {user && 
           
            
            <NavLink
              to="logout"
              className=" bg-slate-200 flex gap-1 items-center font-extrabold text-black text-center md:w-[100%] rounded-[15px] p-2 cursor-pointer"
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
          <div className="md:grid text-amber-300 mb-3">
            <p>Welcome, {name}!</p>
            <p>Email: {email}</p>
            <p>Grade: {grade}</p>
            <p>Age: {age}</p>
            <p>Group: {group}</p>
            <p>Part: {part}</p>
          </div>
          <Outlet />


          <div className="  mt-4 grid gap-3 grid-cols-1 md:grid-cols-3">
            <div className='bg-slate-300 shadow-md rounded-lg p-3' >
              <h1 className="text-xl mb-2 font-extrabold uppercase ">lessons</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti repellat voluptate temporibus, veniam quidem minus
                soluta, aliquid, quasi quis veritatis consequatur? Nisi ipsum
                corrupti praesentium minus facere itaque, cupiditate dolore?
              </p>
            </div>

            <div className='bg-slate-300 shadow-md rounded-lg p-3' >
              <h1 className="text-xl mb-2 font-extrabold uppercase ">assignments</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti repellat voluptate temporibus, veniam quidem minus
                soluta, aliquid, quasi quis veritatis consequatur? Nisi ipsum
                corrupti praesentium minus facere itaque, cupiditate dolore?
              </p>
            </div>

            <div className='bg-slate-300 shadow-md rounded-lg p-3' >
              <h1 className="text-xl mb-2 font-extrabold uppercase ">tutors</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti repellat voluptate temporibus, veniam quidem minus
                soluta, aliquid, quasi quis veritatis consequatur? Nisi ipsum
                corrupti praesentium minus facere itaque, cupiditate dolore?
              </p>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
