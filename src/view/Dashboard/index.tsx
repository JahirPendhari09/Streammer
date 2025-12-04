import React, { useEffect, useState } from 'react';
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoTvOutline, IoTv } from "react-icons/io5";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";

import { useDispatch, useSelector } from 'react-redux';
import { SidebarItem } from '../../components/SidebarItem';
import streammer_logo from "../../assest/logo.png";
import { MdArrowForwardIos } from "react-icons/md";
import { LOGIN_USER_SUCCESS } from '../../redux/actionTypes';
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [onBlurTab, setBlurTab] = useState<string>('');
  const [isSidebarActive, setSidebarActive] = useState<boolean>(false);

  const size = useSelector((store: any) => store.theme.size);

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`); 
  };

  useEffect(() => {
    const user = localStorage.getItem('user') || undefined;
    if (user) {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: JSON.parse(user) });
    }

    // Default route when dashboard first loads:
    navigate("/dashboard/home");
  }, []);

  return (
    <div className='bg-black h-[100vh] w-full text-white'>
      <div className='h-full max-w-[1600px] border-1 border-neutral-500 m-auto rounded-2xl flex overflow-hidden'>
        
        {/* ---- SIDEBAR ---- */}
        <div className='w-[10%] h-full flex flex-col'>

          <div className='w-full flex justify-center items-center'>
            <div className='my-10 flex flex-col items-center gap-4 cursor-pointer'>
              <img src={streammer_logo} className='w-8 h-8 rounded-full' />
              <div className='flex gap-1 p-1 pl-2 text-yellow-300 text-sm bg-amber-950 rounded-2xl items-center cursor-pointer'>
                <button>Subscribe</button>
                <div className='pt-0.5'><MdArrowForwardIos /></div>
              </div>
            </div>
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
              tabName=''
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
              label='Room'
              tabName='room'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />

            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<IoMdNotifications size={size} />}
              iconInactive={<IoMdNotificationsOutline color='gray' size={size} />}
              label='Notifications'
              tabName='notifications'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />

            <SidebarItem
              onBlurTab={onBlurTab}
              setBlurTab={setBlurTab}
              isSidebarActive={isSidebarActive}
              iconActive={<FaUser size={size} />}
              iconInactive={<FaRegUser color='gray' size={size} />}
              label='Profile'
              tabName='profile'
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
          </div>

        </div>

        <div className='w-[90%] h-full overflow-y-auto'>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
