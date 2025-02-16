import React from "react";
import heroImg from "../assets/studio.png";
import Header from "./Header";
import {Outlet} from 'react-router-dom'

const Main = () => {
  return (
    <div className=' h-screen  bg-hero-100  m-0' >
      <Header />
      <div className="    m-0 justify-center  grid place-items-center   ">
        <Outlet/>
        {/* <h1 className="text-white text-3xl  "> YOUTH CHOIR MUSHIN</h1> */}
      </div>
    </div>
  );
};

export default Main;
