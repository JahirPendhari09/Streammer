import React, { useState } from 'react';
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { FaSearch, FaRunning } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoTvOutline, IoTv } from "react-icons/io5";
import { BiSolidVideoRecording, BiVideoRecording, BiMoviePlay, BiSolidMoviePlay } from "react-icons/bi";
import { TbCategoryFilled, TbCategory2 } from "react-icons/tb";
import { FaRegUser, FaUser  } from "react-icons/fa6";

import { useSelector } from 'react-redux';
import { Home } from '../Home';
import { Profile } from '../Profile';
import { SidebarItem } from '../../components/SidebarItem';


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [onBlurTab, setBlurTab] = useState<string>('');
  const [isSidebarActive, setSidebarActive] = useState<boolean>(false);
  const size = useSelector((store:any) => store.theme.size)

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className='bg-black h-[100vh] w-full text-white'>
      <div className=' h-full max-w-[1600px] border-1 border-neutral-500 m-auto rounded-2xl flex overflow-hidden'>
        <div className='w-[10%] h-full flex flex-col'>
          <div className='w-full h-[100px] flex justify-center items-center'>
            <div>Logo</div>
          </div>
          <div
            className='flex flex-col h-full w-full relative z-100'
            onMouseEnter={() => setSidebarActive(true)}
            onMouseLeave={() => setSidebarActive(false)}
          >
            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<AiFillHome size={size} />}
              iconInactive={<AiOutlineHome color='gray' size={size} />}
              label='Home'
              tabName='home'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<FaSearch size={size} />}
              iconInactive={<CiSearch color='gray' size={size} />}
              label='Search'
              tabName='search'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<IoTv size={size} />}
              iconInactive={<IoTvOutline color='gray' size={size} />}
              label='TV'
              tabName='tv-show'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<BiSolidMoviePlay size={size} />}
              iconInactive={<BiMoviePlay color='gray' size={size} />}
              label='Movies'
              tabName='movies'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<FaRunning size={size} />}
              iconInactive={<FaRunning color='gray' size={size} />}
              label='Sports'
              tabName='sports'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<BiSolidVideoRecording size={size} />}
              iconInactive={<BiVideoRecording color='gray' size={size} />}
              label='Sparks'
              tabName='sparks'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<TbCategoryFilled size={size} />}
              iconInactive={<TbCategory2 color='gray' size={size} />}
              label='Categories'
              tabName='categories'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<FaUser size={size} />}
              iconInactive={<FaRegUser  color='gray' size={size} />}
              label='Profile'
              tabName='profile'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
          </div>
        </div>
        <div className='w-[90%] h-full'>
          {activeTab === 'home' && <Home/>}
          {activeTab === 'profile' && <Profile/>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

