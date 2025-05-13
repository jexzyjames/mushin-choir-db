import React, { useState,useRef, useEffect } from "react";
import regImg from "../assets/reg-img.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../redux/slices/authSlice";
import { update } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {updateDoc,getDoc, doc} from 'firebase/firestore'
import { db } from "../config/firebaseconfig";
import {FaList, FaFlag } from "react-icons/fa6";
import {FaCheck, FaTimes } from "react-icons/fa";
import Modals from "../modals/Modals";
import ScrollProgress from "../utils/ScollProgress";
const Profile = () => {
  const dispatch = useDispatch();
  // const[modal,setModal]= useState(false)
  const {id} = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const[displayName] = useState(user?.name)
  const[grade] = useState(user?.grade)
  const[image, setImageUrl] = useState(user?.imageUrl)
  const[newImage, setNewImage] = useState('')
  const [group ] = useState(user?.group);
  const [phoneNum] = useState(user?.number);
 const [part] = useState(user?.part);
  const[loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
 

  const [val, setVal] = useState({
    grade: grade,
    part: part,
    imageUrl:'',
    name: displayName,
    phoneNum:phoneNum,
    group: group,

  })
  useEffect(()=>{
    // handleSubmit()
  }, [user,modal])
  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images");

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dpd7w91aa/image/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
            // ✅ Update state with Cloudinary URL
            setVal((prev) => ({ ...prev, imageUrl: data.secure_url }));
            console.log("Image uploaded:", data.secure_url);
        }
    } catch (error) {
        console.error("Upload error:", error);
    }
};



  const handleSubmit = async () => {
    
    console.log(user); 
    try{
      setModal(true)
      setLoading(true)
    handleImageUpload()
    await updateDoc(doc(db,'users', id), {...val})
    setLoading(false)
    console.log(val)
  }

  catch(error) {
    console.error("Error uploading image:", error);
    setLoading(false);
    toast.error(error);
    console.error(error);
  }
 


  }
 
return (
    <div className='w-full fades'>
      <ScrollProgress/>
              <div className="flex bg-white mb-1 shadow-lg rounded-xl p-2  gap-1 items-center">
                <FaList />
                
                <h2 className="font-mono font-bold ">PROFILE {user?.grade}</h2>
              </div>
       
        <form
          onSubmit={(e)=>{
            e.preventDefault();
    console.log(user); 

            handleSubmit();

          }}
          className=" p-2  w-full  flex flex-col-reverse  gap-6  m-auto md:grid    "
        >
         

          {/* data fields e.g(name, email ...) */}
          
          <div className=" text-sm  p-[1rem]   md:py-2 rounded-xl bg-white  shadow-md md:grid ">
            <div className="w-[100%]   gap-[9px]  md:grid md:grid-cols-2">

            <div className="font-bold col-span-2 mb-3 text-left text-3xl text-orange-300">
              UPDATE PROFILE
              <img
                className=" mt-4 cursor-pointer rounded-[200px] w-18 h-18 bg-cover bg-center bg-slate-950  border-green-300 p-1  "
                src={user?.imageUrl || regImg}
                alt="user"
              />
            </div>
            <div>
              <h1 className= "  text-black mt-2 text-md mb-1">Upload image</h1>
              <input
                className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:border-0 disabled:text-slate-600 text-black placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="file"
                // disabled
                onChange={(e)=> handleImageUpload(e.target.files[0]) }
                placeholder="Chukwuma Ciroma"
              />
            </div>
            {/* <img
                className=" cursor-pointer rounded-[200px] w-18 h-18 bg-cover bg-center bg-slate-950  border-green-300 p-1  "
                src={val?.imageUrl}
                onClick={() => setOpen(!open)}
                alt="user"
              /> */}
            <div>
              <h1 className= "  text-black mt-2 text-md mb-1">Name</h1>
              <input
                className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:border-0 disabled:text-slate-600 text-black placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="text"
                disabled
                value={val.name} 
                onChange={(e)=> setVal({...val, name: e.target.value}) }
                placeholder="Chukwuma Ciroma"
              />
            </div>
            <div>
              <h1 className="text-black text-md mb-1">Whatsapp Number</h1>
              <input
                className="text-black placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="tel"
                required
                value={val.phoneNum}
                min='11'
                max='14'
                // pattern="/^-?\d+$/"
                onChange={(e)=>setVal({...val, phoneNum: e.target.value})}

                maxLength={12}
                placeholder="01234567890"
              />
            </div>

            {/* <div>
              <h1 className="text-black text-md mb-1">Whatsapp Number</h1>
              <input
                className="text-black placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="number"
              
                placeholder="01234567890"
              />
            </div> */}

           

           

            <div>
              <h1 className="text-black text-md mb-1">Parts</h1>
              <select
                value={val.part}
                onChange={(e)=> setVal({...val, part: e.target.value}) }
              
                className="text-black cursor-pointer placeholder:text-slate-900  bg-white border rounded-md p-1 w-full "
                name="parts"
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
              value={val.group}
              onChange={(e)=> setVal({...val, group: e.target.value}) }
               
                className=" text-black cursor-pointer placeholder:text-slate-900  bg-white border rounded-md w-full p-1 "
                name="group"
                id=""
              >
                <option value="">-- SELECT GROUP --</option>
                <option value="ODIOLOWO">ODIOLOWO</option>
                <option value="ALAFIA">ALAFIA</option>
                <option value="IDIORO">IDIORO</option>
              </select>
            </div>

            <div>
              <h1 className="  text-black text-md mb-1">Grade</h1>
              <select
               value={val.grade}
               onChange={(e)=> setVal({...val, grade: e.target.value}) }
               
                className=" text-black md:mb-2 cursor-pointer mb-4 placeholder:text-slate-900  bg-white border rounded-md p-1 w-full "
                name="group"
                
              >
                <option className=" bg-white" value="">
                  -- SELECT GRADE --
                </option>
                <option  className=" bg-white" value="PRELIM">
                  PRELIM
                </option>
                <option className=" bg-white" value="GRADE 1">
                  GRADE 1
                </option>
                <option className=" bg-white" value="GRADE 2">
                  GRADE 2
                </option>
                <option  className=" bg-white" value="GRADE 3">
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

            <ToastContainer/>
            <input
              className="cursor-pointer  col-span-2 bg-[#ff2d1c] hover:bg-slate-900 text-white border rounded-md p-1 w-full mt-2 "
              type="submit"
              value={loading? 'loading...' : 'Update'}
            />
      </div>

          </div>
         {modal && 
         <Modals>
            {modal ? 
                       <div className='bg-white  absolute mx-auto text-black flex  flex-col w-full max-w-[300px]  text-center p-3  rounded-md shadow-md '>
                                     <h1 className='md:text-2xl font-extrabold flex gap-2 text-sky-500 mb-2 uppercase ' > Confirm Details <FaFlag/></h1>
                        
                       <p className='text-black flex gap-2 font-bold '>Name: <p className="text-green-500 font-extrabold"> {user?.name}</p></p>
                       <p className='text-black flex gap-2 font-bold '>Name: <p className="text-green-500 font-extrabold"> {val.name}</p></p>
                       <p className='text-black flex gap-2 font-bold '>Email: <p className="text-green-500 font-extrabold"> {user?.email}</p></p>
                       <p className='text-black flex gap-2 font-bold '>Grade: <p className="text-green-500 font-extrabold"> {val.grade}</p></p>
                       <p className='text-black flex gap-2 font-bold '>Phone Number: <p className="text-green-500 font-extrabold"> {val.phoneNum}</p></p>
                       <p className='text-black flex gap-2 font-bold '>Part: <p className="text-green-500 font-extrabold"> {val.part}</p></p>
                       <p className='text-black flex gap-2 font-bold '>Group: <p className="text-green-500 font-extrabold"> {val.group}</p></p>
                       {/* <h2 className='text-yellow-800 font-extrabold md:text-xl ' >{displayName}</h2> */}
                       <div className='w-full flex gap-4 justify-center mt-3 mb-3 items-center '>
                           <button onClick={()=> {
                              setModal(false);
                              setLoading(false)
    toast.success('User details updated successfully');
          
                                navigate('')
                              
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
        </form>
      
    </div>
  );
};

export default Profile;


