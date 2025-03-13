import React from 'react'
import bg from '../assets/logo.jpg'
import bgImage from '../assets/logo-2.png'
import bgImages from '../assets/ass-1.svg'
import Community from '../components/Community'
import About from '../components/About'
import Contact from '../components/Contact'
import ScrollProgress from '../utils/ScollProgress'
const Home = () => {
  return (
    <div className=' fades flex flex-col text-center items-center justify-center w-full' >
    <ScrollProgress/>
    <div
    // style={ { backgroundImage: `url(${bgImages})`, backgroundSize: 'cover', backgroundPosition:'center', backgroundRepeat: 'no-repeat' }  }
    className="  w-full flex-col m-auto h-screen flex items-center justify-center"
    >
        <h1 className='text-5xl font-bold text-center text-white'>Mushin Youth  Choir</h1>

        <h2 className='text-2xl text-center font-bold text-white'>Welcome to Mushin Youth Choir</h2>


    </div>

    <Community/>
    <About/>     
    <Contact/>         

    </div>

  )
}

export default Home