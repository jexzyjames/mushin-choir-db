import React from "react";

const Community = () => {
  return (
    <div className="h-screen">
    <div className=" mt-[90px] mx-auto justify-center w-full md:justify-center grid md:place-items-center">
      <h1 className="text-white font-extrabold text-2xl text-center uppercase md:text-3xl  lg:text-5xl  ">
        We are Old Mushin Youth Choir
      </h1>
      <p className='text-[17px] text-center w-full font-bold text-white  pt-2 md:w-[80%]'>
        We are a fast growing commmunity of people cut across ages from{" "}
        <b className="text-amber-500 ">13-25</b>{" "}
      </p>

      <div className='flex mx-auto  mt-7 text-left   bg-white md:justify-center md:items-center' >
        <input placeholder='Enter your email address' className='text-black placeholder:text-black p-1 border-0 outline-0 '  type='text' />
        <button className='text-black bg-sky-600 p-2 hover:bg-gray-300 ' >Subscribe</button>
      </div>

    {/* Programs Section */}
      <h1 className='text-center mt-8 text-xl font-extrabold '>OUR PROGAM</h1>
      <p className="text-center font-bold text-sky-600">What We Offer</p>
    <div className="grid mt-[7%] items-center place-items-center grid-cols-3">
    <div className="rounded-md p-2 text-black bg-cover bg-center opacity-80 bg-[url(/src/assets/logos.png)] shadow-md h-[100px] text-center">
      <h1> RUDIMENTS OF MUSIC</h1>
    </div>
    <div className="rounded-md p-2 text-black bg-cover bg-center opacity-80 bg-[url(/src/assets/logos.png)] shadow-md h-[100px] text-center">
      <h1> INSTRUMENTALS TRAINING</h1>
    </div>
    <div className="rounded-md flex items-center relative p-2 text-black bg-cover bg-center opacity-80 bg-[url(/src/assets/ass-1.svg)] shadow-md h-[100px] text-center">
      <h1 className=' rounded-md shadow-md font-bold   text-center ' > SONGS TRAINING</h1>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Community;
