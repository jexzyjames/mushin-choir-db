import React, { useState,useRef, useEffect } from "react";
import regImg from "../assets/reg-img.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../redux/slices/authSlice";
import { update } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {updateDoc, doc} from 'firebase/firestore'
import { db } from "../config/firebaseconfig";
import { FaEye,FaEyeSlash } from "react-icons/fa6";
import {  updateUserDetails } from "../redux/slices/authSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const { user } = useSelector((state) => state.auth);
  const passwordRef = useRef(null);
  const[passRef, setPassRef] = useState('password');
  const navigate = useNavigate();
  const[displayName, setDisplayName] = useState(user.name)
  const[email, setEmail] = useState(user.name)
  const[password, setPassword] = useState( user.password)
  const[grade, setGrade] = useState(user.grade)
  const [group, setGroup] = useState(user.group);
  const [district, setDistrict] = useState('');
  const [age, setAge] = useState(user.age);
  const [part, setPart] = useState(user.part);
  const [image, setImage] = useState('');

  const[loading, setLoading] = useState(false)
 

  const [val, setVal] = useState({
    grade: grade,
    part: part,
    name: displayName,
    group: group,
    age:age,

  })
  useEffect(()=>{
    
  }, [user, dispatch, loading])
  const { status, error } = useSelector((state) => state.auth);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    console.log(user);


    console.log(id)
    
  try{
    await updateDoc(doc(db, "users", id), val);
    setLoading(false)
    toast.success('User details updated successfully');
    console.log(val)
  }

  catch(error) {
    toast.error(error);
    console.error(error);
  }
setLoading(false)
 


  }
 
return (
    <div className=''>
       
        <form
          onSubmit={handleSubmit}
          className="md:h-screen p-2 md:p-8   flex flex-col-reverse  gap-6 md:gap-2 m-auto md:grid  md:place-items-center md:grid-cols-1  "
        >
         

          {/* data fields e.g(name, email ...) */}

          <div className=" text-sm  p-[1rem]   md:py-2 rounded-xl bg-white  shadow-md md:grid ">
            <div className="w-[100%]   gap-[9px]  md:grid md:grid-cols-2">

            <h1 className="font-bold col-span-2 mb-3 text-left text-3xl text-orange-300">
              UPDATE PROFILE
            </h1>

            <div>
              <h1 className="text-black mt-2 text-md mb-1">Name</h1>
              <input
                className="text-black placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="text"
                value={val.name} 
                onChange={(e)=> setVal({...val, name: e.target.value}) }
                placeholder="Chukwuma Ciroma"
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
              <h1 className="text-black text-md mb-1">Age</h1>
              <input
                className="text-black  placeholder:text-slate-900  bg-white border w-full rounded-md p-1  mb-2 "
                type="number"
                value={val.age}
                onChange={(e)=> setVal({...val, age: e.target.value}) }
               
              />
            </div>

           

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
              <h1 className="text-black text-md mb-1">Grade</h1>
              <select
               value={val.grade}
               onChange={(e)=> setVal({...val, grade: e.target.value}) }
               o
                className=" text-black md:mb-2 cursor-pointer mb-4 placeholder:text-slate-900  bg-white border rounded-md p-1 w-full "
                name="group"
                id=""
              >
                <option className=" bg-white" value="">
                  -- SELECT GRADE --
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

            <ToastContainer/>
            <input
              className="cursor-pointer  col-span-2 bg-[#ff2d1c] hover:bg-slate-900 text-white border rounded-md p-1 w-full mt-2 "
              type="submit"
              value={loading? 'loading...' : 'Update'}
            />
      </div>

          </div>
        </form>
      
    </div>
  );
};

export default Profile;


