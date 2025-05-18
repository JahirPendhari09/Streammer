import { ChangeEvent, useState } from "react";
import { BiSolidSend } from "react-icons/bi";

const Chat = () => {
  const [message, setMessage] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <div className='w-full h-full border-2 rounded-xl overflow-hidden'>
      <div className='w-full h-full relative bg-fuchsia-400 '>
        <div className='w-5/6 m-auto absolute left-6 bottom-4 '>
          <div className='border-2 rounded-xl flex items-center justify-between w-full m-auto h-10 p-2'>
            <input 
              placeholder="Chat with friends" 
              className='border-0 outline-none'
              value={message}
              onChange={(e) => handleChange(e)} 
            />
            <div className='w-6 h-6 rounded-full bg-green-600 flex justify-center items-center cursor-not-allowed'>
              <BiSolidSend color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat