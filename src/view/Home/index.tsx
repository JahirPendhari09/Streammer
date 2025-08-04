import { useEffect, useMemo, useState } from 'react'
import { ImagesDataType, VideoDataType } from './types';
import { videoThumbnels } from './static';
import { Link } from 'react-router-dom';
import { getCustomVideos } from '../../services/general';

const activeVideoIdx = 2

const dummyData = [
  {
    id:1,
    color: "bg-red-200",
    text: "KGF",
    url: "https://www.youtube.com/embed/u7tZqzZUAPk?si=28LD0Ajqjvn4hGE9",
    images: ['https://www.coogfans.com/uploads/db5902/original/3X/8/1/81173237ffa580ef710b0862fdddaac163274db1.jpeg']
  },
  {
    id:2,
    color: "bg-red-500",
    text: "KGF-2",
    url: "https://www.youtube.com/embed/rWDlFoZYK4s?si=YgY24jRPyQKaNiQm",
    images: ['https://www.coogfans.com/uploads/db5902/original/3X/e/6/e6a5137a80c87dbeef9ca3ccac8a6f1f875551d1.jpeg']
  },
  {
    id:3,
    color: "bg-yellow-200",
    text: "Saho",
    url: "https://www.youtube.com/embed/5hYU5nywU4s?si=sn1hgGj_2bg7iru3",
    images: ['https://www.imgonline.com.ua/examples/random-pixels-wallpaper-big.jpg']
  },
  {
    id:4,
    color: "bg-green-200",
    text: "Kick",
    url: "https://www.youtube.com/embed/dRUclW77-jI?si=CCidVGQGR-7y1WjM",
    images: ['https://pbs.twimg.com/profile_images/1103467654248128514/4I_CQnS7_400x400.jpg']
  },
  {
    id:5,
    color: "bg-orange-200",
    text: "Kill",
    url: "https://www.youtube.com/embed/_uZivil33GE?si=2ECAr8ruGdYcRh_x",
    images: ['https://i.sstatic.net/O3Vr0.jpg']
  },
  {
    id:6,
    color: "bg-nautral-200",
    text: "Pathan",
    url:"https://www.youtube.com/embed/PGYhaaO9ikY?si=6v3-sa3iVgIOZMPX",
    images: ['https://upload.wikimedia.org/wikipedia/commons/b/be/Random_pyramids.jpg']
  },
]

export const Home = () => {

  const [activeVideo, setActiveVideo] = useState<VideoDataType[]>(videoThumbnels)
  const [images, setImages] = useState<ImagesDataType[]>([])
  const [activeBar, setActiveBar] = useState(dummyData[0])

  const [mockDummy, setMockDummy] = useState(dummyData)

  const fetchPosts = async () => {
    const response = await getCustomVideos()
      if (response) {
        setImages(response)
      } else {
        setImages([])
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleVideoClick = (item: any) => {
    // const getIndex = activeVideo.indexOf(item);
    // if (getIndex === activeVideoIdx) return;

    // const total = activeVideo.length;
    // const shift = getIndex - activeVideoIdx;

    // const rotatedVideo = activeVideo.map((_, i) => {
    //   const newIndex = (i + shift + total) % total;
    //   return activeVideo[newIndex];
    // });

    // setActiveVideo(rotatedVideo);
    setActiveBar(item)
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
    <div className='w-full h-full'>
      <div className='flex h-full flex-col w-full h-full gap-10 overflow-y-auto whitespace-nowrap scroll-smooth no-scrollbar'>
        <div className='w-full h-[800px] flex justify-center items-center relative cursor-pointer'>
          {
            // activeVideo.length > 0 && activeVideo.map((item, i) => {
            //   return (
            //     <div className={`w-[300px] h-[200px] rounded-2xl overflow-hidden
            //       ${i === 1 ? 'left-30' : i === 3 ? 'right-30' : i === 4 ? 'right-0' : i == 0 ? 'left-0' : ''}
            //       ${i === 2 ? 'z-100 left-50 w-[600px] h-[300px]' : (i === 1 || i == 3) ? 'z-50 absolute' : 'z-10 absolute'}`}
            //       key={item.id}
            //     >
            //       <div
            //         className={`w-full h-full rounded ${item.color}`}
            //         onClick={() => handleVideoClick(item)}
            //       >
            //         {/* <iframe
            //           key={item.url} 
            //           title={`YouTube video ${item.label}`}
            //           className='w-full h-[180px] rounded'
            //           src={item.url}
            //           frameBorder="0"
            //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            //           allowFullScreen
            //         ></iframe> */}
            //         <div key={item.id}></div>
            //       </div>
            //     </div>
            //   )
            // })
          }

          <div className='w-full h-[500px] pl-4'>
            <div className='w-full h-full relative'>
              <div className={`${activeBar.color} w-full h-full flex justify-center items-center`}>
                {/* {activeBar.text} */}
                <iframe
                  className='w-1/2 h-1/2'
                  src={activeBar.url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className='flex absolute right-0 bottom-0 gap-4 p-2'>
              {mockDummy.length && mockDummy.map(element => (
                <div
                  key={element.id}
                  className={`w-20 h-20 rounded-xl ${element.color} ${activeBar.id === element.id ? 'border-2' : ''}`}
                  onClick={() => handleVideoClick(element)}
                >
                  <img src={element.images[0]} alt='Movie-image'  className='w-full h-full rounded-xl'/>
                </div>
              ))}
            </div>
          </div>
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
  )
}
