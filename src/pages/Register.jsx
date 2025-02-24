import React, { useState,useRef, useEffect } from "react";
import regImg from "../assets/reg-img.png";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaEye,FaEyeSlash, FaFlag } from "react-icons/fa6";
import { FaTimes, FaMarker,FaCheck  } from "react-icons/fa";
import { createUser } from "../redux/slices/userSlice";
import Modals from "../modals/Modals";
import { TbRubberStampOff } from "react-icons/tb";
const Register = () => {
  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const lengthRef = useRef(0);
  const phoneRef = useRef(0);
  const[passRef, setPassRef] = useState('password');
  const navigate = useNavigate();
  const [modal, setModal] = useState(false)

  useEffect(()=>{},[modal])
  const { status, error } = useSelector((state) => state.auth);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser({email,password,grade,displayName,group,age,part}))
    .unwrap()
    .then(() => {
      toast.error('user registered successfully');
      setModal(true);
      navigate("/login");
    })
    .catch((err) => {
      toast.error(err);
      console.error('Login failed:', err)

    });
    console.log({email, password, grade, displayName, group, district, age, part, image});

  };

 



  const[displayName, setDisplayName] = useState('')
  const[email, setEmail] = useState('')
  const[phoneNum, setPhoneNum] = useState(0)
  const[password, setPassword] = useState('')
  const[grade, setGrade] = useState('')
  const [group, setGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [age, setAge] = useState('');
  const [part, setPart] = useState('');
  const [image, setImage] = useState('');
  return (
    <div className=''>
       
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="md:h-screen p-2 md:p-8   flex flex-col-reverse  gap-6 md:gap-2 m-auto md:grid  md:place-items-center md:grid-cols-1  "
        >
         

          {/* data fields e.g(name, email ...) */}

          <div className=" text-sm  p-[1rem]   md:py-2 rounded-xl bg-white  shadow-md md:grid ">
            <div className="w-[100%]   gap-[9px]  md:grid md:grid-cols-2">

            <h1 className="font-bold col-span-2  text-left text-3xl text-orange-300">
              Register
            </h1>
            <h1 className="font-semibold col-span-2 mb-1 text-left text-xl text-black">
              Fill out all fields correctly
            </h1>

            <h1 className=" col-span-2 mb-2 text-left text-md text-black">
              Already have an account? <Link className='text-blue-600' to="/login">Login</Link>
            </h1>

            <div>
              <h1 className="text-black text-md mb-1">Name</h1>
              <input
                className="text-black placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="text"
                ref={lengthRef}
                required
                value={displayName} 
                maxLength={20}
                onChange={(e)=>setDisplayName(e.target.value)}
                placeholder="Chukwuma Ciroma"
              />
            </div>
            {<p className='absolute hidden' >{displayName.length == lengthRef.current.maxLength && toast.error('Name is more than required')}</p>}

            <div>
              <h1 className="text-black text-md mb-1">Whatsapp Number</h1>
              <input
                className="text-black placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="tel"
                required
                value={phoneNum}
                ref={phoneRef}
                min='11'
                max='14'
                // pattern="/^-?\d+$/"
                onChange={(e)=>setPhoneNum(e.target.value)}

                maxLength={12}
                placeholder="01234567890"
              />
            </div>
            {

                <p className='absolute hidden ' >{phoneNum.toString().length == phoneRef.current.maxLength && toast('PhoneNumber is more than 11')}</p>
              }
           
            <div className="w-full">
              <h1 className="text-black cursor-pointer text-md mb-1">D-O-B</h1>
              <input
                className="text-black  cursor-pointer  placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="date"
                required
                value={age} 
                onChange={(e) => setAge(e.target.value)  }
                placeholder="13"
              />
            </div>

            <div>
              <h1 className="text-black text-md mb-1">Email</h1>
              <input
                className="text-black placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="email"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)  }
                placeholder="email@example.com"
              />
            </div>

            <div>
              <h1 className="text-black text-md mb-1">Password</h1>
              <div className="flex w-full justify-center rounded-md border p-2 h-7 items-center ">

              <input
                className="text-black outline-0 placeholder:text-slate-900 flex justify-center items-center  bg-white  w-full  rounded-md p-1  mb-2 "
                type={passRef}
                ref={passwordRef}
                value={password}
                required
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

            <div>
              <h1 className="text-black text-md mb-1">Parts</h1>
              <select
                value={part}
                onChange={(e)=> setPart(e.target.value)  }
                className="text-black cursor-pointer placeholder:text-slate-900  bg-white border rounded-md p-1 w-full "
                name="parts"
                required
                id=""
              >
                <option value="">-- SELECT PARTS --</option>
                <option value="SOPRANO">SOPRANO</option>
                <option value="ALTO">ALTO</option>
                <option value="TENOR">TENOR</option>
                <option value="BASS">BASS</option>
              </select>
            </div>

            <div>
              <h1 className="text-black text-md mb-1">Group</h1>
              <select
              value={group}
                onChange={(e) =>
                  setGroup(e.target.value)
                }
                className=" text-black cursor-pointer placeholder:text-slate-900  bg-white border rounded-md w-full p-1 "
                name="group"
                required
              >
                <option value="">-- SELECT GROUP --</option>
                <option value="ODIOLOWO">ODIOLOWO</option>
                <option value="ALAFIA">ALAFIA</option>
                <option value="IDIORO">IDIORO</option>
              </select>
            </div>

            <div>
              <h1 className="text-black text-md mb-1">Grade</h1>
              <select
               value={grade}
               onChange={(e)=> setGrade(e.target.value)  }
                className=" text-black md:mb-2 cursor-pointer mb-4 placeholder:text-slate-900  bg-white border rounded-md p-1 w-full "
                name="group"
                required
                id=""
              >
                <option className=" bg-white" value="">
                  -- SELECT GRADE --
                </option>
                <option className=" bg-white" value="PRELIM">
                  PRELIM
                </option>
                <option className=" bg-white" value="GRADE 1">
                  GRADE 1
                </option>
                <option className=" bg-white" value="GRADE 2">
                  GRADE 2
                </option>
                <option className=" bg-white" value="GRADE 3">
                  GRADE 3
                </option>
                <option className=" bg-white" value="GRADE 4">
                  GRADE 4
                </option>
                <option className=" bg-white" value="GRADE 5">
                  GRADE 5
                </option>
              </select>
            </div>

            <input
              className="cursor-pointer  col-span-2 bg-[#ff2d1c] hover:bg-slate-900 text-white border rounded-md p-1 w-full mt-2 "
              type="submit"
              value="Submit"
            />
      <ToastContainer/>
      </div>

          </div>
        </form>
        {modal && 
        
      <Modals>
      {modal ? 
             <div className='bg-white  absolute mx-auto text-black flex  flex-col w-full max-w-[300px]  text-center p-3  rounded-md shadow-md '>
             <h1 className='md:text-2xl font-extrabold flex gap-2 text-sky-500 mb-2 uppercase ' > Confirm Details <FaFlag/></h1>
             <p className='text-black flex gap-2 font-bold '>Name: <p className="text-green-500 font-extrabold"> {displayName}</p></p>
             <p className='text-black flex gap-2 font-bold '>D-O-B: <p className="text-green-500 font-extrabold"> {age}</p></p>
             <p className='text-black flex gap-2 font-bold '>Email: <p className="text-green-500 font-extrabold"> {email}</p></p>
             <p className='text-black flex gap-2 font-bold '>Grade: <p className="text-green-500 font-extrabold"> {grade}</p></p>
             <p className='text-black flex gap-2 font-bold '>Password: <p className="text-green-500 font-extrabold"> {password}</p></p>
             <p className='text-black flex gap-2 font-bold '>Phone Number: <p className="text-green-500 font-extrabold"> {phoneNum}</p></p>
             <p className='text-black flex gap-2 font-bold '>Part: <p className="text-green-500 font-extrabold"> {part}</p></p>
             <p className='text-black flex gap-2 font-bold '>Group: <p className="text-green-500 font-extrabold"> {group}</p></p>
             {/* <h2 className='text-yellow-800 font-extrabold md:text-xl ' >{displayName}</h2> */}
             <div className='w-full flex gap-4 justify-center mt-3 mb-3 items-center '>
                 <button onClick={()=> {
                    setModal(false);
                    if(user){

                      navigate('/login')
                    }
                 }} className='text-white w-full rounded-md shadow-md p-2 text-md flex gap-2 items-center bg-sky-500' ><FaCheck className="text-green-700 bg-white rounded-lg text-xl p-1" />Yes</button>
                 <button onClick={()=> {
                     setModal(false)
                    
                 }} className='text-white flex gap-2  items-center w-full rounded-md shadow-md p-2 text-md  bg-red-500' > <FaTimes className="text-red-300 bg-white rounded-lg text-xl p-1" /> NO</button>
             </div>
         </div> 
         : 
         ''
            
        }
      </Modals>
        }
    </div>
  );
};

export default Register;


