import React from 'react'

const Contact = () => {
  return (
    <div className='grid md:mt-10 grid-cols-1 md:grid-cols-2 gap-3 justify-between w-full'>
        <div>
            <form className=' flex flex-col gap-3  bg-white rounded-md shadow-md p-2 text-black' >
                <label className='font-bold text-sky-500' htmlFor="namme">Name</label>
                <input className=' border-y-2 bg-slate-500 p-2  border-purple-600 border-x-0 outline-o font-bold border ' type="text" placeholder='Your Name'  />
                <label className='font-bold text-sky-500' htmlFor="message">Phone Nunber</label>
                <input className=' border-y-2 bg-slate-500 p-2  border-purple-600 border-x-0 outline-o font-bold border ' type="number" placeholder='Your Number'  />

                <label className='font-bold text-sky-500' htmlFor="message">Feedbacks</label>
                <textarea className='bg-slate-600 p-2 font-bold '  placeholder='Your Feedbacks ' ></textarea>
                <button className='bg-sky-500 p-2 m-0 w-[60px] hover:scale-x-105 hover:bg-amber-400 flex justify-start items-start text-white  cursor-pointer rounded-md ' type="submit">Submit</button>
            </form>
        </div>
        <div>
            <h1>GET IN TOUCH</h1>
        </div>
    </div>
  )
}

export default Contact