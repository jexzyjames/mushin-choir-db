import React from "react";
import img from "../assets/logo.jpg";
import img1 from "../assets/logos.png";
const About = () => {
  return (
    <div className=" mt-[2%] md:mt-[5%] p-2    mx-auto    ">
        <h1 className="font-bold text-2xl mb-2 text-sky-400 ">ABOUT US</h1>
        <div className="  max-w-[1200px] p-2 md:grid md:grid-cols-2  gap-4 flex md:flex-row flex-col-reverse   md:gap-2 md:justify-between  w-full  ">

      <div className='w-full md:max-w-[400px] rounded-md'>
        <img className="rounded-lg w-[100%]  " src={img1} alt="" />
      </div>
      <div className='flex h-full justify-center items-start flex-col w-full'>
        <h2 className="text-slate-400    uppercase mb-2  font-extrabold text-2xl">
          Raising Godly & Competent Minstrels
        </h2>
        <h2 className="text-slate-500 italic font-extrabold text-left mb-3 text-2xl">
          Music is everybody's possession. It's  only publishers who think that people own it.
        </h2>
        <p className='font-bold text-xl text-indigo-300 text-left ' >
          We are committed to raising Godly, Competent and Disciplined Minstrels
          capable of singing hymns, playing of the instruments with a sonorous
          voice with grace from their hearrts,{" "}
        </p>

        <p className="mt-2 font-bold text-xl    text-indigo-300 text-left">
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
