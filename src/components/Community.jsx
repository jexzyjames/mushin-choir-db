import React from "react";
import { FaMusic } from "react-icons/fa";
import {BiMusic} from 'react-icons/bi';
import {CiKeyboard} from 'react-icons/ci';

const Community = () => {
  return (
    <div className=" bg-[#dddeed] w-full">
    <div className=" mt-[90px] mx-auto justify-center w-full md:justify-center grid md:place-items-center">
      <h1 className="text-black font-extrabold text-2xl text-center uppercase md:text-3xl  lg:text-5xl  ">
        We are Old Mushin Youth Choir
      </h1>
      <p className='text-[17px] text-center w-full font-bold text-sky-500  pt-2 md:w-[80%]'>
        We are a fast growing commmunity of people cut across ages from{" "}
        <b className="text-amber-500 ">13-25</b>{" "}
      </p>

      <div className='flex mx-auto  mt-7 text-left rounded-md border-none outline-none   bg-indigo-300 md:justify-center md:items-center' >
        <input placeholder='Enter your email address' className='text-black placeholder:text-black p-1   '  type='text' />
        <button className='text-white bg-blue-600 p-2 hover:bg-blue-500 ' >Subscribe</button>
      </div>

    {/* Programs Section */}
      <h1 className='text-center mt-8 text-xl font-extrabold '>OUR PROGAM</h1>
      <p className="text-center font-bold text-sky-600">What We Offer</p>
    <div className="grid mt-[7%] items-center place-items-center grid-cols-3">
    <div className=" hover:bg-white cursor-pointer rounded-md flex gap-2 items-center  p-2 text-black bg-cover bg-center shadow-md  text-center">
      <span className="bg-gray-400 p-2 rounded-full block "> <FaMusic className="p-1 " size={40}/></span>
      <div>
        <h1>Rudiment of Music</h1>
      </div>
    </div>
    <div className=" hover:bg-white cursor-pointer rounded-md flex gap-2 items-center  p-2 text-black bg-cover bg-center shadow-md  text-center">
      <span className="bg-gray-400 p-2 rounded-full block "> <CiKeyboard className="p-1 " size={40}/></span>
      <div>
        <h1>Instrumental Training</h1>
      </div>
    </div>
    <div className=" hover:bg-white cursor-pointer rounded-md flex gap-2 items-center  p-2 text-black bg-cover bg-center shadow-md  text-center">
      <span className="bg-gray-400 p-2 rounded-full block "> <BiMusic className="p-1 " size={40}/></span>
      <div>
        <h1>Songs Training</h1>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Community;
