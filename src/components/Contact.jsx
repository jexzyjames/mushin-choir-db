import React from "react";
import { FaAddressCard, FaMailBulk } from "react-icons/fa";
import { FaAddressBook, FaBox, FaMapLocation, FaMessage, FaPhone } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className=" md:px-[10%] px-4  gap-x-[40px]  grid w-full place-items-center justify-center items-center  mx-auto  h-screen md:mx-auto md:mt-[5%] ">
      <h1 className="font-extrabold text-amber-500 text-3xl text-center">CONTACT US </h1>
      <h2 className="font-bold  text-white text-center">Get In Touch</h2>
      <div className="grid md:h-screen  grid-cols-1 md:grid-cols-2 gap-3 justify-between w-full">
      {/* left sction */}
        <div className="flex  flex-col w-full h-[100%">
          <h1 className="mb-4 flex gap-4 items-start text-left  text-xl text-white font-extrabold" >Send us a message 
          <span><FaMessage /></span>
          </h1>
          <p className="text-left text-lg">
            Feel free to reach out through contact form or find our contact
            information below. Your feedback, questions, and suggestionss are
            important to us as we strive to provide exceptional service to our
            university community.
          </p>

          <ul className="mt-5 flex flex-col gap-3">
            <li className="flex items-center gap-2">
                <FaMessage/>
                <span className="text-amber-400 text-lg font-extrabold">ycmushin@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
                <FaPhone />
                <span className="text-amber-400 text-lg font-extrabold">+234 7045 666 940</span>
            </li>
            <li className="flex items-center gap-2">
                <FaMapLocation />
                <span className="text-amber-400 text-lg font-extrabold">Owo Street, Alafia</span>
            </li>
          </ul>
        </div>

        {/* form section */}
        <div className="flex flex-col w-full h-full" >
          <form className=" flex flex-col gap-3 w-full h-full  rounded-md  p-2 text-black">
            <label className="font-extrabold text-left text-sky-500" htmlFor="namme">
              Name
            </label>
            <input
              className="   p-2  border-b  border-b-1    outline-0 font-bold  "
              type="text"
              placeholder="Your Name"
            />
            <label className="font-extrabold text-left text-sky-500" htmlFor="message">
              Phone Nunber
            </label>
            <input
              className="   p-2  border-b  border-b-1   outline-0 font-bold  "
              type="number"
              placeholder="Your Number"
            />

            <label className="font-extrabold text-left text-sky-500" htmlFor="message">
              Send  your Feedbacks
            </label>
            <textarea
              className=" p-2 font-bold "
              placeholder=" Write Your Feedbacks "
            ></textarea>
            <button
              className="bg-sky-500 p-2 m-0  border-b  border-b-1   hover:scale-x-105 hover:bg-violet-400 flex justify-center items-start text-white  cursor-pointer rounded-md "
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
