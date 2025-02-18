import React,{useState} from 'react'
import { logoutUser } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from'react-redux'

//   const user = useSelector((state) => state.auth.user);

const Logout = () => {
    const dispatch = useDispatch()

    const[modal, setModal] = useState(true)
    const navigate = useNavigate();
  return (
    <div className='relative bg-slate-900  opacity-90  w-full  text-black' >

    {modal ? 
     <div className='bg-blue-500 right-0 left-0  text-white flex justify-center flex-col  absolute text-center p-3  rounded-xl shadow-lg h-screen'>
     <h1 className='text-xl mb-2 uppercase ' >Are you sure you want to log out</h1>
     <div className='w-full flex gap-4 justify-center mt-3 items-center '>
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