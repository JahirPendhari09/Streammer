import { useEffect, useMemo, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'
import { getGroupChat } from "../../services/general";

const Chat = () => {

  const [message, setMessage] = useState<string>('')
  const [allMessages, setAllMessages] = useState<any>([])
  const bottomRef = useRef<any>(null);
  const user = useSelector((store:any) => store.auth)

  const socket:any = useMemo( () => io('http://localhost:8080'), [] )

  const fetchGroupChat =  async() => {
    try{
      const chat = await getGroupChat()
      setAllMessages(chat)
    }catch(err) {
      console.log("Error", err)
    }
  }
  useEffect(() => {
    socket.emit("join-group", "test");
    fetchGroupChat();
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);


  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("join-group", "test");
    });

    socket.on("receive_message", (data: any) => {
      setAllMessages((prev: any) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, []);
  
  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (message.trim() !== '') {
      socket.emit('message', { message, group: 'test', user }); // Emit message to room '1'
      // setAllMessages((prevMessages:string) => [...prevMessages, message]);
      setMessage('');
    } 
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };


  return (
    <div className='w-full h-full border-2 rounded-xl overflow-hidden flex flex-col relative'>
      <div className="w-[290px] m-auto h-full overflow-y-scroll text-white no-scrollbar mb-16">
        <div className="pt-4 flex flex-col">
          {allMessages.length > 0 && allMessages.map((message: any, index: number) => {
            const isMe = message.sender?._id === user._id;

            return (
              <div
                key={index}
                className={`w-full flex ${isMe ? "justify-end" : "justify-start"} mb-1`}
              >
                <div className={`px-3 py-2 rounded-lg max-w-[80%] ${isMe ? "bg-green-600 text-white" : "bg-gray-700 text-white"}`}>
                  <p>{message.message}</p>
                  <span className="text-[10px] text-gray-300 float-right block mt-1">
                    {formatTime(message.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
          {/* empty div to auto scroll into view */}
          <div ref={bottomRef} />
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