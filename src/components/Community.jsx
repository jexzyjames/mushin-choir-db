import React from "react";

const Community = () => {
  return (
    <div className="text-white h-full  text-center m-0  grid place-items-center justify-center  font-bold">
      <h1 className="text-amber-500 text-3xl uppercase md:text-3xl  lg:text-5xl  ">
        We are old Mushin Youth Choir
      </h1>
      <p className='text-xl pt-2 w-[80%]'>
        We are a fast growing commmunity of people cut across ages from{" "}
        <b className="text-cyan-400">13-25</b>{" "}
      </p>

      <div className='flex  mt-7  bg-white justify-center items-center' >
        <input placeholder='Enter your email address' className='text-black placeholder:text-black p-1 border-0 outline-0 '  type='text' />
        <button className='text-black bg-sky-600 p-2 hover:bg-gray-300 ' >Subscribe</button>
      </div>
    </div>
  );
};

export default Community;
