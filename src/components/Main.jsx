import React from "react";
import heroImg from "../assets/studio.png";
import Header from "./Header";
import {Outlet} from 'react-router-dom'

const Main = () => {
  return (
    <div className=' bg-no-repeat opacity-105 bg-opacity-100 bg-cover bg-center bg-[url("/src/assets/prayer.jfif")]  text-white' >
      <Header />
      <div className=' '>

        <Outlet/>
      </div>
        {/* <h1 className="text-white text-3xl  "> YOUTH CHOIR MUSHIN</h1> */}
    </div>
  );
};

export default Main;
