import { useEffect, useMemo, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client'
import { getGroupChat } from "../../services/general";
import { MdDelete } from "react-icons/md";
import { SET_GROUP_CHAT } from "../../redux/actionTypes";
import { useSocket } from "../../context/SocketContext";

const Chat = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState<string>('')
  const bottomRef = useRef<any>(null);
  const user = useSelector((store:any) => store.auth)
  const { chat, isLoad, group }  = useSelector((store: any) => store.chat)

  const socket = useSocket()
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);


  useEffect(() => {
    if (!socket) return;

    socket.emit("join-group", "test");

    const onReceiveMessage = (data: any) => {
      dispatch({
        type: SET_GROUP_CHAT,
        payload: [...chat, data],
      });
    };

    const onDelete = (data: any) => {
      dispatch({
        type: SET_GROUP_CHAT,
        payload: chat.filter((msg: any) => msg._id !== data.id),
      });
    };

    socket.on("receive_message", onReceiveMessage);
    socket.on("user_message_deleted", onDelete);

    return () => {
      socket.off("receive_message", onReceiveMessage);
      socket.off("user_message_deleted", onDelete);
    };
  }, [socket, chat]);

  
  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (message.trim() !== '') {
      socket.emit('message', { message, group: 'test', user });
      // setAllMessages((prevMessages:string) => [...prevMessages, message]);
      setMessage('');
    } 
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const deleteMessageClick = (message: any) => {
    socket.emit("message_delete", { id: message._id, group: "test" });
  };

  return (
    <div className='w-full h-full border-2 rounded-xl overflow-hidden flex flex-col relative'>
      <div className="w-[290px] m-auto h-full overflow-y-scroll text-white no-scrollbar mb-16">
        <div className="pt-4 flex flex-col gap-2">
          {chat.length > 0 && chat.map((message: any, index: number) => {
            const isMe = message.sender?._id === user._id;
            return (
              <div
                key={index}
                className={`w-full flex ${isMe ? "justify-end" : "justify-start"} mb-1`}
              >
                <div className={`px-3 pt-4 py-2 relative rounded-lg border min-w-[80px] max-w-[80%] ${isMe ? "bg-green-600 text-white" : "bg-gray-700 text-white"}`}>
                  { isMe && <span className="absolute right-1 top-1" onClick={()=> deleteMessageClick(message)}>
                    <MdDelete size={16} color="lightblue"/>
                  </span> }
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