import React from "react";
import heroImg from "../assets/studio.png";
import Header from "./Header";
import {Outlet} from 'react-router-dom'
import CircularScrollProgress from "../utils/CircularScrollProgress";

const Main = () => {
  return (
    <div className='  main bg-no-repeat opacity-105 h-screen bg-opacity-100 bg-cover bg-center   ' >
      <Header />
      <div className=' '>

        <Outlet/>
      </div>
      <CircularScrollProgress/>
        {/* <h1 className="text-white text-3xl  "> YOUTH CHOIR MUSHIN</h1> */}
    </div>
  );
};

export default Main;
