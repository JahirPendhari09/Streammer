import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import Members from './Members';
import Chat from './Chat';

const VideoMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('video')
  const [isNotificationShow, setNotificationShow] = useState<Boolean>(true)
  const size = useSelector((store:any) => store.theme.size)
  
  const handleNotificationClick = () => {
    setNotificationShow(!isNotificationShow)
  }

  const handleTabClick = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className='bg-black h-[100vh] w-full text-white'>
      <div className=' h-full max-w-[1400px] border-neutral-500 m-auto rounded-2xl flex overflow-hidden'>
        <div className='w-full h-full p-6'>
          <div className='flex h-full flex-col w-full h-full gap-4'>
            <div className='w-full h-10 flex justify-between items-center'>
              <div>Watch</div>
              <div> 4 members</div>
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
    </div>
  );
};

export default VideoMenu;