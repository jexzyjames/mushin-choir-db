import React,{useState} from 'react'

const Modals = ({children}) => {
        const[modal, setModal] = useState(true)
    
  return (

    <div>
         <div className='absolute top-0 m-auto flex justify-center items-center right-0 left-0 bottom-0 bg-slate-700   opacity-95  w-full  text-black' >
        
        {children}
           
        
            </div>
    </div>
  )
}

export default Modals