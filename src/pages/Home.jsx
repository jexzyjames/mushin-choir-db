import React from 'react'
import bg from '../assets/logo.jpg'
import bgImage from '../assets/logo-2.png'
import bgImages from '../assets/ass-1.svg'
const Home = () => {
  return (
    <div className='h-screen  flex flex-col text-center items-center justify-center w-full' >

    <div
    // style={ { backgroundImage: `url(${bgImages})`, backgroundSize: 'cover', backgroundPosition:'center', backgroundRepeat: 'no-repeat' }  }
    className="   w-full flex-col m-auto h-screen flex items-center justify-center"
    >
        <h1 className='text-5xl font-bold text-center text-white'>Mushin Youth  Choir</h1>

        <h2 className='text-2xl text-center font-bold text-white'>Welcome to Mushin Youth Choir</h2>


    </div>

    </div>

  )
}

export default Home