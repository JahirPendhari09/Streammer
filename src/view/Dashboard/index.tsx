import React, { useState, ReactNode, useEffect, useMemo } from 'react';
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { FaSearch, FaRunning } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoTvOutline, IoTv } from "react-icons/io5";
import { BiSolidVideoRecording, BiVideoRecording, BiMoviePlay, BiSolidMoviePlay } from "react-icons/bi";
import { TbCategoryFilled, TbCategory2 } from "react-icons/tb";
import { getCustomVideos } from '../../services/general';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

type SidebarItemType = {
  onBlurTab: string;
  setBlurTab: (tab: string) => void;
  isSidebarActive: boolean;
  iconActive: ReactNode;
  iconInactive: ReactNode;
  label: string;
  tabName: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

type VideoDataType = {
  id: number;
  label: string;
  color: string;
  url: string
}

type ImagesDataType = {
  id: number;
  mal_id: string;
  images: any;

}
const videos: Array<VideoDataType> = [
  {
    id: 1,
    label: 'A',
    color: 'bg-red-200',
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    label: 'B',
    color: 'bg-gray-200',
    url: "https://www.youtube.com/embed/kXYiU_JCYtU",
  },
  {
    id: 3,
    label: 'C',
    color: 'bg-orange-200',
    url: "https://www.youtube.com/embed/oHg5SJYRHA0",
  },
  {
    id: 4,
    label: 'D',
    color: 'bg-green-200',
    url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  },
  {
    id: 5,
    label: 'E',
    color: 'bg-blue-200',
    url: "https://www.youtube.com/embed/L_jWHffIx5E",
  },
];


const activeVideoIdx = 2

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [onBlurTab, setBlurTab] = useState<string>('');
  const [isSidebarActive, setSidebarActive] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<VideoDataType[]>(videos)
  const [images, setImages] = useState<ImagesDataType[]>([])
  const size = useSelector((store:any) => store.theme.size)


  const handleActiveTab = (tab: string) => {
    setActiveTab(tab)
  }

  const fetchPosts = async () => {
    const response = await getCustomVideos()
    if(response) {
      setImages(response)
    }else {
      setImages([])
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleVideoClick = (item: VideoDataType) => {
    const getIndex = activeVideo.indexOf(item);
    if (getIndex === activeVideoIdx) return;

    const total = activeVideo.length;
    const shift = getIndex - activeVideoIdx;

    const rotatedVideo = activeVideo.map((_, i) => {
      const newIndex = (i + shift + total) % total;
      return activeVideo[newIndex];
    });

    setActiveVideo(rotatedVideo);
  };

  useEffect(() => {
    const videoChangeInterval = setInterval(() => {
      setActiveVideo((prev) => {
        const total = prev.length;
        return prev.map((_, i) => prev[(i + total - 1) % total]);
      });
    }, 5000);
    return () => clearInterval(videoChangeInterval);
  }, []);


  const imageGrid1 = useMemo(() => (
    images.slice(0, 10).map((image: ImagesDataType) => (
      <div key={image.mal_id} className='min-w-[200px] border-2 h-full rounded-xl overflow-hidden h-full'>
        <img src={image.images['jpg'].image_url} loading="lazy" className='w-full h-5/6' />
        <div className='border-2 h-full'>
            <button className='bg-red-200 w-full h-1/6'>
              <Link to='/player'>Play</Link>
            </button>
        </div>
      </div>
    ))
  ), [images]);

  const imageGrid2 = useMemo(() => (
    images.slice(10).map((image: ImagesDataType) => (
      <div key={image.mal_id} className='min-w-[200px] border-2 h-full rounded-xl overflow-hidden'>
        <img src={image.images['jpg'].image_url} loading="lazy" className='w-full h-5/6' />
        <div className='border-2 h-full'>
            <button className='bg-red-200 w-full h-1/6'>
              <Link to='/player'>Play</Link>
            </button>
        </div>
        
      </div>
    ))
  ), [images]);

  const reversedGrid = useMemo(() => (
    [...images].reverse().map((image: ImagesDataType) => (
      <div key={image.mal_id} className='min-w-[200px] border-2 h-full rounded-xl overflow-hidden'>
        <img src={image.images['jpg'].image_url} loading="lazy" className='w-full h-5/6' />
        <div className='border-2 h-full'>
            <button className='bg-red-200 w-full h-1/6'>
              <Link to='/player'>Play</Link>
            </button>
        </div>
      </div>
    ))
  ), [images]);

  return (
    <div className='bg-black h-[100vh] w-full text-white'>
      <div className=' h-full max-w-[1400px] border-1 border-neutral-500 m-auto rounded-2xl flex overflow-hidden'>
        <div className='w-[100px] h-full flex flex-col'>
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
          </div>
        </div>
        <div className='w-[1300px] h-full'>
          <div className='flex h-full flex-col w-full h-full gap-10 overflow-y-auto whitespace-nowrap scroll-smooth no-scrollbar'>
            <div className='w-full h-[800px] flex justify-center items-center relative cursor-pointer'>
              {
                activeVideo.length > 0 && activeVideo.map((item, i) => {
                  return (
                    <div className={`w-[300px] h-[200px] rounded-2xl overflow-hidden
                      ${i === 1 ? 'left-30' : i === 3 ? 'right-30' : i === 4 ? 'right-0' : i == 0 ? 'left-0' : ''}
                      ${i === 2 ? 'z-100 left-50 w-[600px] h-[300px]' : (i === 1 || i == 3) ? 'z-50 absolute' : 'z-10 absolute'}`}
                      key={item.id}
                    >
                      <div
                        className={`w-full h-full rounded ${item.color}`}
                        onClick={() => handleVideoClick(item)}
                      >
                        {/* <iframe
                          key={item.url} 
                          title={`YouTube video ${item.label}`}
                          className='w-full h-[180px] rounded'
                          src={item.url}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe> */}
                        <div key={item.id}></div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='w-[100%] overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar min-h-[300px] p-4 flex gap-4 cursor-pointer'>
              {imageGrid1}
            </div>

            <div className='w-[100%] overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar min-h-[300px] p-4 flex gap-4 cursor-pointer'>
              {imageGrid2}
            </div>

            <div className='w-[100%] overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar min-h-[300px] p-4 flex gap-4 cursor-pointer'>
              {reversedGrid}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const SidebarItem: React.FC<SidebarItemType> = ({
  onBlurTab,
  setBlurTab,
  isSidebarActive,
  iconActive,
  iconInactive,
  label,
  tabName,
  activeTab,
  setActiveTab
}) => (
  <div
    onMouseEnter={() => setBlurTab(tabName)}
    onMouseLeave={() => setBlurTab('')}
    className='flex h-[60px] justify-center items-center cursor-pointer relative'
    onClick={() => setActiveTab(tabName)}
  >
    <div className='relative'>
      {(activeTab === tabName || onBlurTab === tabName) ? iconActive : iconInactive}
    </div>
    {isSidebarActive && (
      <div className={`absolute left-18 ${(activeTab === tabName || onBlurTab === tabName) ? 'font-bold' : ''} transition-opacity duration-300`}>
        {label}
      </div>
    )}
  </div>
);
