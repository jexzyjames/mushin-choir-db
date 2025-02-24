import React from "react";
import img from "../assets/logo.jpg";
import img1 from "../assets/logos.png";
const About = () => {
  return (
    <div className=" mt-[2%] md:mt-[5%] p-2 md:h-screen  h-[100%] rounded-md shadow-md mx-auto md:max-w-[1200px]  md:px-[9%] ">
        <div className="  p-2 md:grid md:grid-cols-2  gap-4 flex md:flex-row flex-col-reverse rounded-md shadow-md  md:gap-2 md:justify-between  w-[100%] md:mx-auto h-[100%] ">

      <div className='w-full md:max-w-[400px] rounded-md'>
        <img className="rounded-lg w-[100%]  " src={img1} alt="" />
      </div>
      <div className='flex h-full flex-col w-full'>
        <h1 className="font-bold text-sky-400 ">ABOUT US</h1>
        <h2 className="text-white font-extrabold text-xl">
          Raising Godly & Competent Minstrels
        </h2>
        <p className='font-bold ' >
          We are committed to raising Godly, Competent and Disciplined Minstrels
          capable of singing hymns, playing of the instruments with a sonorous
          voice with grace from their hearrts,{" "}
        </p>

        <p className="mt-2 font-bold ">
          We are committed to raising Godly, Competent and Disciplined Minstrels
          capable of singing hymns, playing of the instruments with a sonorous
          voice with grace from their hearrts,{" "}
        </p>
      </div>
      </div>
    </div>
  );
};

export default About;
