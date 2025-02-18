import React from "react";
import heroImg from "../assets/studio.png";
import Header from "./Header";
import {Outlet} from 'react-router-dom'

const Main = () => {
  return (
    <div className=' bg-black' >
      <Header />
      <div className='h-screen'>

        <Outlet/>
      </div>
        {/* <h1 className="text-white text-3xl  "> YOUTH CHOIR MUSHIN</h1> */}
    </div>
  );
};

export default Main;
