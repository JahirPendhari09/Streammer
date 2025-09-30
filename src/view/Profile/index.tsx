import { FiPlay } from "react-icons/fi";
import { AiOutlineAudio, AiFillAudio } from "react-icons/ai";
import { IoMdTv } from "react-icons/io";
import { IoTv } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";

const size = 20
export const Profile = () => {
  const [theme, setTheme] = useState<string>("dark")
  const [email, setEmail] = useState<string>('')

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setEmail(e.target.value)
  }

  return (
    <div className="w-full h-full">
      <div className="flex  justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center w-full h-full gap-4">
          <button className="px-4 py-1 rounded-full border-1 border-gray-600 text-blue-300 ">Streaming for independent Creators</button>
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
          <div className="w-[400px] mt-4 flex justify-between px-2 py-1 bg-gray-900 rounded-full border-1 border-gray-500 text-blue-300" >
            <input 
              placeholder="Email address" 
              className="outline-none w-[70%] pl-4"
              value={email}
              onChange={handleChange}
            />
            <button className=" w-[30%] bg-blue-800 text-white rounded-full px-3 py-2  cursor-pointer hover:bg-blue-900"> Get started</button>
          </div>
        </div>
      </div>
    </div>
  )
}
