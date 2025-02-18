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
import Hero from "./Hero";
import { FaArrowAltCircleRight } from "react-icons/fa";
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
  const [open, setOpen] = useState(false);
  const [head, sethead] = useState("DASHBOARD");
  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, [dispatch, sethead, user, email, name, grade, age, group, part]);
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
    <>
      <div className=" relative  bg-slate-50   ">
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
                className=" cursor-pointer rounded-[200px] w-8 h-8 bg-cover bg-center bg-slate-950  border-green-300 p-1  "
                src={image}
                onClick={() => setOpen(!open)}
                alt="user"
              />
              {/* <ProfileImage userId={user?.uid} /> */}
              <p>{name} </p>
              {open && (
                <div className="flex-col animate-pulse  transition-all flex gap-3  items-center  z-50 p-2  mt-[260px] right-9 fixed w-[200px] bg-white shadow-md rounded-md  justify-center">
                  <img
                    className="rounded-[200px] w-20 h-20 bg-cover bg-center bg-slate-950  border-green-300 p-1  "
                    src={image}
                    alt="user"
                  />
                  <h1 className='flex gap-1' > <p className="text-yellow-700 font-bold " >{user.email}</p></h1>
                  <h1 className='flex gap-1' >Hi! <p className="text-yellow-600 font-bold " >{user.name}</p></h1>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className=" flex justify center m-auto items-center gap-1 text-center w-full bg-gray-300 font-extrabold  rounded-md shadow-md p-1 "
                  >
                   <FaArrowAltCircleRight/> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT SECTION */}
        <Hero head={head} sethead={sethead} />
        <div>
          {/* <Outlet /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
