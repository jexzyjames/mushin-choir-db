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
    <div className=" m-0 md:h-1  px-[2%]   md:px-[10%] py-4 md:flex w-full relative justify-between  text-slate-900  ">
      {Logo}
      <div className=" absolute md:hidden md:relative top-7 md:right-0 md:top-0 right-0">
        <FaAlignLeft
          onClick={() => {
            setIsOpen(!isOpen);
            console.log(isOpen);
          }}
          className="cursor-pointer h-[20px] w-[90px]"
        />
      </div>
      <nav className="md:flex  flex flex-col md:justify-center">
        <ul
        onClick={()=>setIsOpen(true)}
          className={`md:flex md:relative bg-sky-500 text-white    opacity-0 justify-start items-start md:items-start flex flex-col md:flex-row fixed top-0 h-[100%] bottom-0 right-0 w-[150px] p-5 py-[120px] md:p-2 cursor-pointer ${
            !isOpen
              ? " opacity-100 text-white  translate-y-0"
              : "opacity-0  text-white-translate-y-5 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"
          }  md:relative md:bg-transparent bottom-0 top-0 fixed h-full   bg-sky-800  text-amber-500  gap-4`}
        >
          <FaTimes
            className=" md:hidden h-[25px] w-[80px] absolute top-7  md:top-0  right-0  flex justify-end items-end cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          />
          <li className="mt-1  md:mt-0">
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
              <div className="flex rounded-md justify-center md:bg-purple-600  items-center bg-purple-500 ">

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
          <div className="flex">

          <Link className="px-4 py-1 flex gap-1 items-center justify-center bg-purple-500 rounded-md   text-white" to="dash">
            {" "}
            <FaUser /> {user.name}
          </Link>
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
    </div>
  );
};

export default Header;
