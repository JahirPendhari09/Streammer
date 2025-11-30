import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import Members from './Members';
import Chat from './Chat';
import { AppDispatch } from '../../redux/store';
import { getAllUsers } from '../../services/authServices';
import { Modal } from '../../components/Modal';
import { OnlineUsersProps } from './types';
import { LuSend } from "react-icons/lu";
import { RiRadioButtonLine } from "react-icons/ri";
import { getGroupChat, loadJoinedMembers } from '../../services/general';
import { io } from 'socket.io-client';


const VideoMenu: React.FC = () => {
  const  dispatch = useDispatch<AppDispatch>()
  const [activeTab, setActiveTab] = useState<string>('video')
  const [isNotificationShow, setNotificationShow] = useState<boolean>(true)
  const [isOnlineUsersModalOpen, setOnlineUsersModalOpen] = useState<boolean>(false)
  const size = useSelector((store:any) => store.theme.size)
  const {onlineUsers, joinedPeoples, group, isLoad } = useSelector((store:any) => store.chat)
  const user = useSelector((store:any) => store.auth)
  const socket:any = useMemo(() => io('http://localhost:8080'), [] )

  const handleNotificationClick = () => {
    setNotificationShow(!isNotificationShow)
  }

  const handleTabClick = (value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    if(!isLoad) {
      dispatch(getGroupChat(group))
    }
  }, [])

  useEffect(() => {
    if (user?._id) {
      socket.emit("join_user", user._id);   //  this is required
      console.log("Joined personal notification room:", user._id);
    }
  }, [user]);



  const handleOnlineUsersModalClick = () =>{
    setOnlineUsersModalOpen(!isOnlineUsersModalOpen)
  }

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(loadJoinedMembers(group))
  }, [])

  const handleJoinRequestClick = (data) => {
    socket.emit("send_notification",{
      senderId: user._id,
      receiverId: data._id,
      message:"A new message arrived",
      type:"message",
      link:"/chat/987"
    })
  }

  return (
    <div className='bg-black h-[100vh] w-full text-white'>
      <div className=' h-full max-w-[1400px] border-neutral-500 m-auto rounded-2xl flex overflow-hidden'>
        <div className='w-full h-full p-6'>
          <div className='flex h-full flex-col w-full h-full gap-4'>
            <div className='w-full h-10 flex justify-between items-center'>
              <div>Watch</div>
              <div onClick={handleOnlineUsersModalClick}> 4 members</div>
            </div>
            <div className='w-full flex flex-col relative cursor-pointer'>
              <div className='w-full h-10 flex items-center'>
                <div className='flex h-full gap-2 items-center w-3/4'>
                  <div> 
                    <Link to='/'><IoIosArrowBack size={size}/></Link>
                  </div>
                  <div className='pb-1'>Family Man</div>
                </div>
                <div className='flex gap-4 items-center w-1/4 '>
                    <div className='pb-2' onClick={handleNotificationClick}>
                      { isNotificationShow ? <IoIosNotifications size={size} /> : <IoIosNotificationsOff size={size}/> } 
                    </div>
                    <div className='pb-2'><IoSettingsOutline size={size}/></div>
                    <div 
                      className={`pb-2 text-sm font-medium border-b-2 ${ activeTab === 'video' ? "" : "border-transparent"}`}
                      onClick={ () => handleTabClick('video')}
                    > Video </div>
                    <div 
                      className={`pb-2 text-sm font-medium border-b-2 ${ activeTab === 'message' ? "" : "border-transparent"}`}
                      onClick={ () => handleTabClick('message')}
                    > Message </div>
                </div>
              </div>     
              <div className='w-full flex justify-between h-[500px]'>
                <div className='w-[73%] h-full'>
                  <div className='h-full w-full border-2 rounded-xl'></div>
                </div>
                <div className='w-[25%] h-full'>
                  { activeTab === 'video' ? <Members peoples= {joinedPeoples} /> : <Chat/> }
                </div>
              </div>          
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOnlineUsersModalOpen} onClose={handleOnlineUsersModalClick}> 
        <div className='w-[300px] '>
          <h3 className='text-center text-2xl'>Online Members</h3>
          <div className='mt-4 '>
            { onlineUsers.length > 0 && onlineUsers.map((onlineUser:OnlineUsersProps) => {
              const isMe = onlineUser?._id === user._id;
              return ( 
                !isMe && <OnlineMenu onlineUser={onlineUser} onClick = {handleJoinRequestClick}/>
              )
            })}
            {onlineUsers.length === 0 && <p className='text-center p-8'> No members online</p>}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoMenu;

const OnlineMenu = ({onlineUser, onClick}:any) => {
  return (
    <div key={onlineUser._id} className='w-full border flex items-center gap-6 justify-between items-center my-2 '>
      <div className='flex gap-6 items-center'>
        <p> <RiRadioButtonLine  color="green"/></p>
        <div className='flex gap-4'>
          <p>{onlineUser.firstName}</p>
          <p>{onlineUser.lastName}</p>
        </div>
      </div>
      <div className='cursor-pointer' onClick={() => onClick(onlineUser)}><LuSend /></div>
      </div> 
  )
}