import { useEffect, useMemo, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'

const Chat = () => {

  const [message, setMessage] = useState<string>('')
  const [allMessages, setAllMessages] = useState<any>([])

  const user = useSelector((store:any) => store.auth.username)

  const socket:any = useMemo( () => io('http://localhost:8080'), [] )

  useEffect(() => {
    socket.on("connect", () => {
      console.log('connected');
      socket.emit('join-room', '1'); // Join room with ID '1'
    });

    // Listen for incoming messages
    socket.on('receive_message', (data: any) => {
      console.log('Received message:', data);
      setAllMessages((prevMessages:string) => [...prevMessages, data]);
    });


    return () => {
      socket.disconnect()
    }

  },[])
  
  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (message.trim() !== '') {
      socket.emit('message', { message, room: '1', user }); // Emit message to room '1'
      setAllMessages((prevMessages:string) => [...prevMessages, message]);
      setMessage('');
    }

  }

  return (
    <div className='w-full h-full border-2 rounded-xl overflow-hidden flex flex-col relative'>
      <div className="w-[290px] m-auto h-full overflow-y-scroll text-white no-scrollbar mb-16">
        <div className="pt-4 flex flex-col">
          {
            allMessages.length > 0 && allMessages.map((message:any) => {
              return <p key={message} className="flex justify-end">{message}</p>
            })
          }
        </div>
      </div>
        
      <div className='w-full h-[50px] absolute bottom-0'>
        <div className='w-5/6 m-auto absolute left-6 bottom-4'>
          <div className='border-2 rounded-xl flex items-center justify-between w-full m-auto h-10 p-2'>
            <input
              placeholder='enter message' 
              className='border-0 outline-none'
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
            />
            <div 
              className={`w-6 h-6 rounded-full bg-green-600 flex justify-center items-center ${!message ? 'cursor-not-allowed' : '' }`}
              onClick={handleSubmit}
            >
              <BiSolidSend color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat