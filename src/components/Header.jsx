import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import { FaUser, FaAlignLeft, FaRegAddressCard } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const Logo = (
  <span>
    <Link className="flex gap-[2px]" to="/">
      <img className=" w-10 h-10" src={logo} alt="" />
    </Link>
  </span>
);
const Header = () => {
  const [isOpen, setIsOpen] = useState(true);

  const user = useSelector((state) => state.auth.user);

  return (
    <div className=" m-auto  px-[2%]  md:px-[10%] py-4 md:flex w-full relative justify-between  text-white  ">
      {Logo}
      <div className="absolute md:hidden top-7 right-0">
        <FaAlignLeft
          onClick={() => {
            setIsOpen(!isOpen);
            console.log(isOpen);
          }}
          className="cursor-pointer w-[60px]"
        />
      </div>
      <nav className="md:flex flex flex-col md:justify-center">
        <ul
        onClick={()=>setIsOpen(true)}
          className={`md:flex opacity-0 justify-center items-center md:items-start flex flex-col md:flex-row absolute top-0 right-2 w-[150px] p-5 md:p-2 cursor-pointer ${
            !isOpen
              ? " opacity-100  translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"
          }  md:relative md:bg-transparent  bg-slate-800 h-screen text-white  gap-4`}
        >
          <FaTimes
            className=" md:hidden w-[60px] absolute top-7   right-0  flex justify-end items-end cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          />
          <li className="mt-5 md:mt-0">
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="community">Community</NavLink>
          </li>

          <li>
            <NavLink to="about">About</NavLink>
          </li>

          <li>
            <NavLink to="contact">Contact</NavLink>
          </li>
          <div className="flex md:hidden pt-3">
            {user?.name ? (
              <div className="flex rounded-md justify-center  items-center bg-purple-500 ">

              <Link className="px-4 py-1  text-white" to="/dash">
                {" "}
                <FaUser /> 
              </Link>
                {user.name}
              </div>
            ) : (
              <Link
                to="/reg"
                className="px-4 bg-sky-400 flex gap-2 items-center justify-center   py-1 rounded-[30px] text-white hover:bg-black "
              >
                {" "}
                <FaRegAddressCard /> Register
              </Link>
            )}
          </div>
        </ul>
      </nav>
      <div className="hidden md:block">
        {user?.name ? (
          <Link className="px-4 py-1  text-white" to="/dash">
            {" "}
            <FaUser /> {user.name}
          </Link>
        ) : (
          <Link
            to="/reg"
            className="px-4 bg-sky-400 flex gap-2 items-center justify-center   py-1 rounded-[30px] text-white hover:bg-black "
          >
            {" "}
            <FaRegAddressCard /> Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
