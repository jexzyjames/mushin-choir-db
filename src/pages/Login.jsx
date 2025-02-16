import React,{useState, useRef,useEffect} from 'react'
import { loginUser } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from'react-redux'
import regImg from '../assets/reg-img.png'
import { toast, ToastContainer } from'react-toastify'
import { useNavigate,Link } from 'react-router-dom'
import { FaEye,FaEyeSlash } from "react-icons/fa6";

const Login = () => {
const [values, setValues] = useState({
    name: "",
    email: "",
    age: 0,
    number: "",
    part: "",
    grade: "",
    group: "",
    password: "",
  });
  const[loading , setLoading] = useState(false)
 const passwordRef = useRef(null);
  const[passRef, setPassRef] = useState('password');
useEffect(()=>{

},[loading])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
  const { status, error } = useSelector((state) => state.auth);
    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true)
        // if(email.length <= 0 && password.length <= 0){
        //     toast.error('Input email and password', {
        //         position:'top-right'
        //     } )
        //     return;
        // }
        
        dispatch(loginUser({email, password}))
      .unwrap()
      .then(() => {
        toast.success('Logged in successfully' )
        setLoading(false)
          navigate('/dash');
      }
    )
      .catch((err) => 
      {
        toast.error(err ,'Login failed', {
            position:'top-right'
        } )
        console.error('Login failed:', err)
        setLoading(false)
      }

    );
        console.log(values);
      };
  return (
    <div className=''>
<form onSubmit={(e)=> handleLogin(e)} className=" flex  justify-center items-center place-items-center p-3  m-auto md:max-w-[600px]    ">
          {/* <div className="p-2 md:overflow-hidden hidden m-auto  rounded-xl bg-white  shadow-md">
            <img
              className="bg-center md:w-[70%] w-full bg-cover border-0 outline-none rounded-xl shadow-xl"
              src={regImg}
              alt="reegister-image"
            />
          </div> */}

          <div className="w-full  gap-[10px] flex flex-col   bg-white shadow-md p-[1.2rem] rounded-xl ">
          <h1 className="font-bold  text-left text-3xl text-orange-300">
              Login
            </h1>
            <h1 className="font-semibold col-span-2 m-0 text-left md:text-xl text-md text-black">
              Input all fields correctly{" "}
            </h1>
            <p className=" flex gap-1  text-left  text-slate-950">
              Don't have an account?  

              <p>
                <Link className='text-blue-500 text-left' to="/reg">   Sign up
                </Link> 
                </p>{" "}
            </p>

            <div>
              <h1 className="text-black text-md mb-2">Email</h1>
              <input
                className="text-black  placeholder:text-gray-600 border w-full rounded-md p-2  "
                type="email"
                
                value={email}
                onChange={(e)=> setEmail(e.target.value)  }
                placeholder="email@example.com"
              />
            </div>

            <div className=' '>
              <h1 className="text-black text-md mb-2">Password</h1>
              <div className="flex w-full justify-center rounded-md border p-2 h-7 items-center ">
              
                            <input
                              className="text-black outline-0 placeholder:text-slate-900 flex justify-center items-center  bg-white  w-full  rounded-md p-1  mb-2 "
                              type={passRef}
                              ref={passwordRef}
                              value={password}
                              onChange={(e)=> {
                                setPassword(e.target.value)
                               
                             }
                            }
                            />
                            <span className='cursor-pointer' onClick={()=>
                            {
                              setPassRef(passRef === 'password'? 'text' : 'password')
                              passwordRef.current.type = passRef === 'password'? 'password' : 'text';
                             
                            }
                             
              
                            } >{passRef === 'password' ? <FaEye/> : <FaEyeSlash className="cursor-pointer" /> }</span>
                              </div>
              </div>

          <ToastContainer />
            <input
              className="cursor-pointer mt-2 col-span-2 bg-[#ff2d1c] hover:bg-slate-900 text-white border rounded-md p-1 w-full mb-2 "
              type="submit"
              value={loading ? 'loading' : 'Log In'}
            />
          </div>
        </form>
        
    </div>
  )
}

export default Login