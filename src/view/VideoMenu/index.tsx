import React, { useEffect, useState } from 'react';
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


const VideoMenu: React.FC = () => {
  const  dispatch = useDispatch<AppDispatch>()
  const [activeTab, setActiveTab] = useState<string>('video')
  const [isNotificationShow, setNotificationShow] = useState<boolean>(true)
  const  [isOnlineUsersModalOpen, setOnlineUsersModalOpen] = useState<boolean>(false)
  const size = useSelector((store:any) => store.theme.size)
  const onlineUsers = useSelector((store:any) => store.chat.onlineUsers)
  
  const handleNotificationClick = () => {
    setNotificationShow(!isNotificationShow)
  }

  const handleTabClick = (value: string) => {
    setActiveTab(value)
  }

  const handleOnlineUsersModalClick = () =>{
    setOnlineUsersModalOpen(!isOnlineUsersModalOpen)
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const handleJoinRequestClick = () => {
    alert('Join request sent!')
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
                  { activeTab === 'video' ? <Members/> : <Chat/> }
                </div>
              </div>          
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOnlineUsersModalOpen} onClose={handleOnlineUsersModalClick}> 
        <div className='w-[400px] '>
          <h3 className='text-center text-2xl'>Online Members</h3>
          <div className='mt-4 '>

          { onlineUsers.length > 0 && onlineUsers.map((user:OnlineUsersProps) => {
            return <div key={user._id} className='flex gap-6 justify-center items-center my-2 '>
               <p> <RiRadioButtonLine  color="green"/></p>
               <p>{user.firstName}</p>
               <p>{user.lastName}</p>
               <div className='cursor-pointer' onClick={handleJoinRequestClick}><LuSend /></div>
              </div>
          })}
          {onlineUsers.length === 0 && <p className='text-center p-8'> No members online</p>}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoMenu;