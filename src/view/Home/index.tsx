import { useCallback, useEffect, useMemo, useState } from 'react'
import { ImagesDataType, VideoDataType } from './types';
import { dummyVideos } from './static';
import { Link } from 'react-router-dom';
import { getCustomVideos } from '../../services/general';


export const Home = () => {

  const [images, setImages] = useState<ImagesDataType[]>([])
  const [activeVideo, setActiveVideo] = useState<VideoDataType> (dummyVideos[0])
  const [mockDummy] = useState<Array<VideoDataType> >(dummyVideos)

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

  const handleVideoClick = useCallback((item: VideoDataType) => {
    setActiveVideo(item);
  }, []);


  useEffect(() => {
    let index = dummyVideos.indexOf(activeVideo);
    const videoChangeInterval = setInterval(() => {
      index = (index + 1) % dummyVideos.length;
      setActiveVideo(dummyVideos[index]);
    }, 8000);

    return () => clearInterval(videoChangeInterval);
  }, [activeVideo]);   


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
          <div className='w-full h-[600px] pl-4 mt-4'>
            <div className='w-full h-full relative rounded-2xl'>
              <div className={`w-full h-full flex justify-center items-center`}>
                <iframe
                  className='w-full h-full rounded-2xl'
                  src={activeVideo.url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className='flex absolute right-0 bottom-0 gap-4 w-[300px] overflow-x-scroll mr-4'>
              {mockDummy.map(element => (
                <div
                  key={element.id}
                  className={`min-w-14 w-14 min-w-10 h-14 rounded ${element.color} ${activeVideo.id === element.id ? 'border-2' : ''}`}
                  onClick={() => handleVideoClick(element)}
                >
                  <img src={element.images[0]} alt='Movie-image'  className='w-full h-full rounded '/>
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
