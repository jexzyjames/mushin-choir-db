import React, { useState, useEffect } from "react";
import {
  NavLink,
  useNavigate,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import {
  FaDashcube,
  FaList,
  FaBook,
  FaUser,
  FaAddressBook,
} from "react-icons/fa6";
import { logoutUser } from "../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { listenForAuthChanges } from "../../redux/slices/authSlice";
import image from "../../assets/reg-img.png";
import logo from "../../assets/logos.png";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Breadcrumbs from "../../utils/Breadcrumbs";
import ScrollProgress from "../../utils/ScollProgress";

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const email = useSelector((state) => state.auth.user?.email);
  const name = useSelector((state) => state.auth.user?.name);
  const grade = useSelector((state) => state.auth.user?.grade);
  const age = useSelector((state) => state.auth.user?.age);
  const group = useSelector((state) => state.auth.user?.group);
  const part = useSelector((state) => state.auth.user?.part);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const headerName = location.pathname;
  const [head, sethead] = useState(headerName);
  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, []);

  useEffect(() => {
    console.log(location);
    if (headerName === "/lessons") {
      sethead("LESSONS");
      return;
    }
    if (headerName === "/assignment") {
      sethead("ASSIGNMENTS");
      return;
    }
    if (headerName.includes("/profile")) {
      sethead("PROFILE");
      return;
    } 
    if (headerName === "/dash") {
      sethead("DASHBOARD");
      return;

    } 
    else {
      return false;
    }
    sethead(headerName);
  }, [location.pathname, head]);

  const Logo = (
    <span>
      <Link className="flex gap-[2px]" to="/">
        <img className=" w-10 h-10" src={logo} alt="" />
      </Link>
    </span>
  );

  const logout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/login"));
  };

  return (
    <div
      
      className=""
    >
      <div className="grid  grid-cols-6 items-center overflow-hidden  w-full md:grid-cols-6 px-[1%] md:px-[1%] py-2 ">
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
              src={user?.imageUrl}
              onClick={() => setOpen((prev) => !prev)}
              alt="user"
            />

            <p>{name} </p>
            {open && (
              <div className="flex-col  fade  transition-all flex gap-3  items-center right-1 z-50 p-2 mt-[270px]  md:mt-[260px] md:right-4 fixed w-[200px] bg-white shadow-md rounded-md  justify-center">
                <img
                  className="rounded-[200px] w-20 h-20 bg-cover bg-center bg-slate-950  border-green-300 p-1  "
                  src={user?.imageUrl}
                  alt="user"
                />
                <h1 className="flex gap-1">
                  {" "}
                  <p className="text-yellow-700 font-bold ">{user.email}</p>
                </h1>
                <h1 className="flex gap-1">
                  Hi! <p className="text-yellow-600 font-bold ">{user.name}</p>
                </h1>
                <button
                  onClick={() => {
                    // setOpen(false);
                    setModal(true);
                  }}
                  className=" flex justify center m-auto items-center gap-1 text-center w-full bg-gray-300 font-extrabold  rounded-md shadow-md p-1 "
                >
                  <FaArrowAltCircleRight /> Sign out
                </button>
                {/* Modal for Logout */}

                {modal ? (
                  <div className="absolute top-0 m-auto  flex justify-center items-center  right-0 left-0 bottom-0 bg-slate-700   opacity-100  w-full  text-black">
                    <div className="bg-white  absolute top-0 right-0 left-0  bottom-0  text-black flex  flex-col  text-center p-3  rounded-md shadow-md ">
                      <h1 className="md:text-xl mb-2 uppercase ">
                        Are you sure you want to log out
                      </h1>
                      <h2 className="text-yellow-800 font-extrabold md:text-xl ">
                        {user.name}
                      </h2>
                      <div className="w-full flex gap-4 justify-center mt-3 mb-3 items-center ">
                        <button
                          onClick={() => {
                            setModal(false);
                            dispatch(logoutUser());
                            navigate("/login");
                          }}
                          className="text-white w-full rounded-md shadow-md p-2 text-md  bg-sky-500"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => {
                            setModal(false);
                            setOpen(false);
                            navigate("/dash");
                          }}
                          className="text-white w-full rounded-md shadow-md p-2 text-md  bg-red-500"
                        >
                          NO
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-slate -10 md:w-full w-[100%]  h-screen     flex flex- m-0  md:flex  md:flex-row ">
        {/* NAVIGATIONS SECTION */}

        <div className="w-[10%]  rounded-md   justify-start flex  items-end justify-self-end p-2 md:w-[20%]">
          <div className="flex  h-full justify-start items-start   flex-col  justify-self-end gap-2 md:gap-4 md:items-start w-full  ">
            <NavLink
              // onClick={() => sethead("DASHBOARD")}
              to="dash"
              className={`flex gap-3 md:w-[100%] items-center  font-extrabold p-2`}
            >
              <p>
                <FaDashcube className=" " />
              </p>
              <p className=" hidden focus:visible  hover:w-full md:block">
                Dashboard
              </p>
            </NavLink>
            <NavLink
              to="lessons"
              // onClick={() => sethead("LESSONS")}
              className="text-black flex gap-3 items-center font-extrabold   text-center  md:w-[100%]  p-2 cursor-pointer"
            >
              <p>
                <FaList />
              </p>
              <p className="hidden md:block ">Lessons</p>
            </NavLink>
            <NavLink
              to="assignment"
              // onClick={() => sethead("ASSIGNMENTS")}
              className="font-extrabold flex  gap-3 items-center   text-center md:w-[100%] p-2 cursor-pointer"
            >
              <p>
                <FaBook />
              </p>
              <p className="hidden md:block">Assignment</p>
            </NavLink>

            <NavLink
              to={`profile/${user?.uid}`}
              // onClick={() => sethead("PROFILE")}
              className="text-black font-extrabold flex gap-3 items-center text-center  md:w-[100%]  p-2 cursor-pointer"
            >
              <p>
                <FaAddressBook />
              </p>
              <p className="hidden md:block ">Profile</p>
            </NavLink>
            {!user && (
              <NavLink
                to="logout"
                className="  flex gap-3 items-center font-extrabold text-black text-center md:w-[100%]  p-2 cursor-pointer"
              >
                <p>
                  <FaUser />
                </p>
                <p className="hidden md:block ">Logout</p>
              </NavLink>
            )}
          </div>
        </div>

        {/* OUTLET SECTION */}

        <div 
        onClick={() => {
          setOpen(false);
        }}
         className="py-3 fades w-[100%]  flex-2 overflow-y-auto  flex-col  bg-white rounded-lg shadow-xl  md:col-span-3 m-0 px-[1%]">
             <Breadcrumbs/>
          <div className="md:grid bg-blue-500 rounded-md  p-3  text-slate-50 mb-3">
            <div className="block md:flex  w-full font-bold md:justify-between p-1">
              <p>
                Welcome to your Dashboard,{" "}
                <b className="text-yellow-500">{name} </b> !
              </p>

              <p>
                {" "}
                Grade:{" "}
                <span className="text-yellow-400 rounded-sm p-2 ">
                  {grade}
                </span>{" "}
              </p>
            </div>
          </div>
         <ScrollProgress/>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Hero;
