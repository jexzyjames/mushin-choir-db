import React,{useState} from 'react'
import { logoutUser } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from'react-redux'


const Logout = () => {
    const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user);

    const[modal, setModal] = useState(true)
    const navigate = useNavigate();
  return (
    <div className='absolute top-0 m-auto flex justify-center items-center right-0 left-0 bottom-0 bg-slate-700   opacity-90  w-full  text-black' >

    {modal ? 
     <div className='bg-white  absolute mx-auto text-black flex  flex-col  text-center p-3  rounded-md shadow-md '>
     <h1 className='md:text-xl mb-2 uppercase ' >Are you sure you want to log out</h1>
     <h2 className='text-yellow-800 font-extrabold md:text-xl ' >{user?.name}</h2>
     <div className='w-full flex gap-4 justify-center mt-3 mb-3 items-center '>
         <button onClick={()=> {
            setModal(false)
             dispatch(logoutUser())
             navigate('/login')
         }} className='text-white w-full rounded-md shadow-md p-2 text-md  bg-sky-500' >Yes</button>
         <button onClick={()=> {
             setModal(false)
             navigate('/dash')
            
         }} className='text-white w-full rounded-md shadow-md p-2 text-md  bg-red-500' >NO</button>
     </div>
 </div> 
 : 
 ''
    
}

    </div>
  )
}

export default Logout