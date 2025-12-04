import { useCallback, useEffect, useState } from 'react';
import { VideoDataType } from './types';
import { getCustomVideos } from '../../services/general';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [videos, setVideos] = useState<VideoDataType[]>([]);
  const [activeVideo, setActiveVideo] = useState<VideoDataType | null>(null);
  const [showPoster, setShowPoster] = useState(true);

  const fetchVideos = async () => {
    const response = await getCustomVideos();
    if (response.length > 0) {
      setVideos(response);
      setActiveVideo(response[0]);
      setShowPoster(true);        
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle poster - video switch (3 sec delay)
  useEffect(() => {
    if (!activeVideo) return;

    setShowPoster(true); // Show poster immediately

    const timer = setTimeout(() => {
      setShowPoster(false); // Show video after 3 sec
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeVideo]);

  const handleChangeVideoClick = useCallback((video: VideoDataType) => {
    setActiveVideo(video);
  }, []);

  const handleVideoClick = () => {
    console.log(activeVideo)
  }

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col gap-10 overflow-y-auto no-scrollbar'>
        
        <div className='w-full h-[700px] flex justify-center items-center relative'>

          <div className='w-full h-full pl-4 mt-4 cursor-pointer'>
            <div className="w-full h-full rounded-2xl relative overflow-hidden" onClick={handleVideoClick}>
              <Link
                key={activeVideo?.id}
                to={`/dashboard/watch/${activeVideo?.filename}`}
                state={{ title: activeVideo?.name, poster: activeVideo?.poster }}
                className="group"
              >
              <iframe
                className={`w-full h-full absolute top-0 left-0 
                  rounded-2xl transition-opacity duration-700 ease-in-out
                  ${showPoster ? "opacity-0" : "opacity-100"}`}
                src={activeVideo?.url}
                allow="autoplay; encrypted-media"
              ></iframe>

              {activeVideo && (
                <img
                  src={activeVideo.poster}
                  className={`w-full h-full absolute top-0 left-0 object-cover 
                    rounded-2xl transition-opacity duration-700 ease-in-out
                    ${showPoster ? "opacity-100" : "opacity-0"}`}
                />
              )}
              </Link>

            </div>


            <div className='flex absolute right-0 bottom-10 gap-4 w-[400px] overflow-x-scroll mr-4'>
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleChangeVideoClick(video)}
                  className={`min-w-24 w-14 h-14 rounded cursor-pointer 
                  ${activeVideo?.id === video.id ? "border-white border-2" : ""}`}
                >
                  <img src={video.poster} className='w-full h-full rounded  object-cover ' />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
