import { useEffect, useMemo, useState } from 'react'
import { ImagesDataType, VideoDataType } from './types';
import { videoThumbnels } from './static';
import { Link } from 'react-router-dom';
import { getCustomVideos } from '../../services/general';

const activeVideoIdx = 2

export const Home = () => {

  const [activeVideo, setActiveVideo] = useState<VideoDataType[]>(videoThumbnels)
  const [images, setImages] = useState<ImagesDataType[]>([])

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
    <div className='w-full h-full'>
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
  )
}
