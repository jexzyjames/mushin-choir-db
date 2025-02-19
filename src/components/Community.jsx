import React from "react";

const Community = () => {
  return (
    <div className="h-screen">
    <div className=" mt-[90px] mx-auto justify-center w-full md:justify-center grid md:place-items-center">
      <h1 className="text-amber-500 text-xl text-center uppercase md:text-3xl  lg:text-5xl  ">
        We are old Mushin Youth Choir
      </h1>
      <p className='text-[17px] text-center w-full text-sky-500 pt-2 md:w-[80%]'>
        We are a fast growing commmunity of people cut across ages from{" "}
        <b className="text-cyan-400">13-25</b>{" "}
      </p>

      <div className='flex mx-auto  mt-7 text-left   bg-white md:justify-center md:items-center' >
        <input placeholder='Enter your email address' className='text-black placeholder:text-black p-1 border-0 outline-0 '  type='text' />
        <button className='text-black bg-sky-600 p-2 hover:bg-gray-300 ' >Subscribe</button>
      </div>
    </div>
    </div>
  );
};

export default Community;
