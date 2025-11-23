import { FiPlay } from "react-icons/fi";
import { AiOutlineAudio, AiFillAudio } from "react-icons/ai";
import { IoMdTv } from "react-icons/io";
import { IoTv } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../services/authServices";
import type { AppDispatch } from "../../redux/store"; // adjust path
import { Navigate } from "react-router-dom";


const size = 20
const initFormData = {
  email: '',
  password: '',
  firstName: '',
  lastName: ''
}

export const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((store: any) => store.auth)
  const theme = useSelector((store:any) => store.theme.theme)
  const [formData, setFormData] = useState(initFormData)
  const [stage, setStage] = useState<string>("email")

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name ,value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleGetStartedClick = () => {
    // setStage("password")
    dispatch(loginUser(formData))

  }

  const handleSubmit = () => {
    dispatch(registerUser(formData))
  }

  if(user.auth) {
    return <Navigate to="/" />
  }

  return (
    <div className="w-full h-full">
      <div className="flex  justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center w-full h-full gap-4">
          <button className="px-4 py-1 rounded-full border-1 border-gray-600 text-blue-300 cursor-pointer hover:bg-gray-800 ">
            Streaming for independent Creators
          </button>
          <h1 className="text-7xl font-bold text-gray-200">New Generation Streaming Platform</h1>
          <div className="flex flex-col justify-center items-center text-2xl text-gray-400">
            <p><span className="font-bold text-gray-200"> Where every story finds its stage, </span> and greatness is an ongoing journey of revelation. </p>
            <p>Get started today to check out our <span className="font-bold text-gray-200"> one of the kind content! </span> </p>
          </div>
          <div className="flex justify-center items-center gap-6 text-gray-400"  >
            <div className="flex gap-2 items-center">
              {theme === 'dark' ? <FiPlay size={size} /> : <FaPlay size={size} /> }
              <p className="mb-1">Movies</p>
            </div>
            <div className="flex gap-2 items-center ">
              {theme === 'dark' ? <AiOutlineAudio size={size} /> : <AiFillAudio size={size} /> }
              <p className="mb-1">Podcats</p>
            </div>
            <div className="flex gap-2 items-center ">
              {theme === 'dark' ? <IoMdTv size={size} /> : <IoTv size={size} /> }
              <p className="mb-1">Series</p>
            </div>
          </div>
          <div >
            {
              stage === 'email' ? (
                <EmailStage 
                 formData={formData}
                 handleChange={handleChange}
                 handleSubmit={handleGetStartedClick}
                />
              ) : (
                <PasswordStage 
                  formData= {formData}
                  handleChange= {handleChange}
                  handleBack= {()=> setStage('email')}
                  handleSubmit= {handleSubmit}
                />
              ) 
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const EmailStage = ({formData, handleChange, handleSubmit}:any) => {
  return <div className="w-[400px] mt-4 flex justify-between px-2 py-1 bg-gray-900 rounded-full border-1 border-gray-500 text-blue-300" >
    <input 
      placeholder="Email address" 
      type="email"
      name="email"
      className="outline-none w-[70%] pl-4"
      value={formData.email}
      onChange={handleChange}
    />
    <button 
      className="w-[30%] bg-blue-800 text-white rounded-full px-3 py-2  cursor-pointer hover:bg-blue-900"
      onClick={handleSubmit}
    > 
      Get started
    </button>
  </div>
}


const PasswordStage = ({formData, handleChange, handleBack, handleSubmit}:any) => {
  const [showpassword, setShowpassword] = useState<boolean>(false)
  const handleShowPasswordClicked =() => {
    setShowpassword(!showpassword)
  }

  return (
  <div className="flex flex-col gap-2 w-[400px]">

    <div className="flex gap-4">
      <div className="w-[50%] mt-4 flex justify-between items-center px-2 py-1 bg-gray-900 rounded-full border-1 border-gray-500 text-blue-300">
      <input 
        placeholder="First Name" 
        name= "firstName"
        type= "text"
        className="outline-none w-[70%] pl-4 p-2"
        value={formData.firstName}
        onChange={handleChange}
      />
    </div>
    <div className="w-[50%] mt-4 flex justify-between items-center px-2 py-1 bg-gray-900 rounded-full border-1 border-gray-500 text-blue-300">
      <input 
        placeholder="Last Name" 
        name= "lastName"
        type= "text"
        className="outline-none w-[70%] pl-4 p-2"
        value={formData.lastName}
        onChange={handleChange}
      />
    </div>
    </div>
    <div className="w-full mt-2 flex justify-between items-center px-2 py-1 bg-gray-900 rounded-full border-1 border-gray-500 text-blue-300">
      <input 
        placeholder="Passworod" 
        name= "password"
        type={showpassword ? "text": "password"}
        className="outline-none w-[70%] pl-4 p-2"
        value={formData.password}
        onChange={handleChange}
      />
      <div   
        className="mr-2 cursor-pointer" 
        onClick={handleShowPasswordClicked}
      >
        {showpassword ? <IoEyeOff color="white" size={size}/> : <IoEye  color="white" size={size} />}
      </div>
    </div>
    <div className="flex justify-between cursor-pointer mt-2">
      <button 
        className="w-[20%] border-1  bg-gray-900 border-gray-500 text-white rounded-full  cursor-pointer hover:bg-blue-950"
        onClick={handleBack}
      > 
        Back
      </button>
      <button 
        className="w-[20%] bg-green-900 border-1 border-green-700 text-white rounded-full p-2  cursor-pointer hover:bg-green-800"
        onClick={handleSubmit}
      > 
        Submit
      </button>
    </div>
  </div>
  )
}
