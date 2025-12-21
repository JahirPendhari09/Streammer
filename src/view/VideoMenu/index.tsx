import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { getCustomVideos, getGroupChat, loadJoinedMembers } from '../../services/general';
import { VideoDataType } from '../Home/types';
import mediasoupService from "./MediasoupClient";
import { useSocket } from '../../context/SocketContext';


const VideoMenu: React.FC = () => {
  const { roomId } = useParams();
  const  dispatch = useDispatch<AppDispatch>()
  const [activeTab, setActiveTab] = useState<string>('video')
  const [isNotificationShow, setNotificationShow] = useState<boolean>(true)
  const [isOnlineUsersModalOpen, setOnlineUsersModalOpen] = useState<boolean>(false)
  const size = useSelector((store:any) => store.theme.size)
  const {onlineUsers, group, isLoad } = useSelector((store:any) => store.chat)
  const user = useSelector((store:any) => store.auth)

  const [peers, setPeers] = useState(new Map());

  const [cameraStream, setCameraStream] = useState(null);
  const [micStream, setMicStream] = useState(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const [videos, setVideos] = useState<VideoDataType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [joined, setJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const socket = useSocket();

  const [activeVideo, setActiveVideo] = useState(null)

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
      socket.emit("join_user", user._id);  
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

  
    useEffect(() => {
      (async () => {
        const response = await getCustomVideos();
        setVideos(response);
      })();
    }, []);
  
    // Filter videos
    const filteredVideos = videos.filter((video) =>
      video.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


  const joinRoom = useCallback(async () => {
    if (!socket || joined || isJoining) return;
    setIsJoining(true);

    socket.emit(
      "join-room",
      { roomId, userData: { name: "User" } },
      async (data) => {
        if (data?.error) {
          alert(data.error);
          setIsJoining(false);
          return;
        }

        await mediasoupService.init(socket, data.rtpCapabilities);

        await mediasoupService.createSendTransport();
        await mediasoupService.createRecvTransport();

        setJoined(true);
        setIsJoining(false);

        if (data.peers) {
          setPeers(() => {
            const map = new Map();
            data.peers.forEach((peerId) => {
              map.set(peerId, {
                peerId,
                cameraOn: false,
                micOn: false,
                videoStream: null,
                audioStream: null,
              });
            });
            return map;
          });
        }
      }
    );
  }, [socket, joined, isJoining, roomId]);

  useEffect(() => {
    joinRoom();
  }, [joinRoom]);

  useEffect(() => {
    if (!socket) return;

    socket.on("peer-joined", ({ peerId }) => {
      setPeers((prev) => {
        const map = new Map(prev);
        map.set(peerId, {
          peerId,
          cameraOn: false,
          micOn: false,
          videoStream: null,
          audioStream: null,
        });
        return map;
      });
    });

    socket.on("peer-left", ({ peerId }) => {
      setPeers((prev) => {
        const map = new Map(prev);
        map.delete(peerId);
        return map;
      });
    });

    socket.on("new-producer", async ({ peerId, producerId, kind }) => {
      const { consumer } =
        await mediasoupService.consume(producerId);

      const stream = new MediaStream([consumer.track]);

      setPeers((prev) => {
        const map = new Map(prev);
        const peer = map.get(peerId);

        if (!peer) return prev;
 
        if (kind === "video") {
          peer.videoStream = stream;
          peer.cameraOn = true;
        } else if (kind === "audio") {
          peer.audioStream = stream;
          peer.micOn = true;
        }

        map.set(peerId, { ...peer });
        return map;
      });
    });

    socket.on("consumer-closed", ({ consumerId }) => {
      const consumer = mediasoupService.getConsumer(consumerId);
      if (!consumer) return;

      const kind = consumer.track.kind;

      setPeers((prev) => {
        const map = new Map(prev);
        for (const peer of map.values()) {
          if (kind === "video") {
            peer.cameraOn = false;
            peer.videoStream = null;
          }
          if (kind === "audio") {
            peer.micOn = false;
            peer.audioStream = null;
          }
        }
        return map;
      });

      mediasoupService.closeConsumer(consumerId);
    });

    return () => {
      socket.off("peer-joined");
      socket.off("peer-left");
      socket.off("new-producer");
      socket.off("consumer-closed");
    };
  }, [socket]);


  const toggleCamera = async () => {
    if (!joined) return;

    if (!cameraOn) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 360 },
      });
      setCameraStream(stream);
      await mediasoupService.produceWebcam(stream);
      setCameraOn(true);
    } else {
      await mediasoupService.stopProducer("video");
      cameraStream?.getTracks().forEach((t) => t.stop());
      setCameraStream(null);
      setCameraOn(false);
    }
  };

  const toggleMic = async () => {
    if (!joined) return;

    if (!micOn) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
      await mediasoupService.produceMicrophone(stream);
      setMicOn(true);
    } else {
      await mediasoupService.stopProducer("audio");
      micStream?.getTracks().forEach((t) => t.stop());
      setMicStream(null);
      setMicOn(false);
    }
  };

  const handleMovieClick = (video) => {
    const videoUrl = `${import.meta.env.VITE_SERVER_URL || 'http://localhost:8080'}/videos/stream/${video.filename}`;
    setActiveVideo({...video, videoUrl})
  }

  return (
    <div className='bg-black h-[100vh] w-full text-white'>
      <div className=' h-full max-w-[1400px] border-neutral-500 m-auto rounded-2xl flex overflow-hidden'>
        <div className='w-full h-full'>
          <div className='flex h-full flex-col w-full h-full gap-4'>
            <div className='w-full h-10 flex justify-between items-center'>
              <div>Watch</div>
              <div onClick={handleOnlineUsersModalClick}>   
                {Array.from(peers.values()).length+1 } Members
              </div>
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
                  <div className='h-full w-full border-2 rounded-xl  overflow-hidden'>
                    {/* <div className="flex-1 flex justify-center items-center bg-black "> */}
                    <div className="flex justify-center items-center bg-black h-full">
                      <VideoPlayer video={activeVideo} />
                    </div>
                  </div>
                </div>
                <div className='w-[25%] h-full'>
                  { activeTab === 'video' ? 
                    <Members 
                      cameraStream= {cameraStream}
                      cameraOn = {cameraOn}
                      micOn = {micOn}
                      peers = {peers}
                      toggleMic = {toggleMic}
                     toggleCamera = {toggleCamera} 
                    /> 
                    : <Chat/> }
                </div>
              </div>          
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 w-[300px]">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-gray-700 
                     focus:border-blue-500 outline-none text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredVideos.map((video) => (
          <div className='cursor-pointer' onClick={(e) => handleMovieClick(video)}>
            <div className="w-full h-40 rounded-xl overflow-hidden bg-black">
              <img
                src={video.poster}
                className="w-full h-full object-cover rounded-xl group-hover:opacity-80 transition"
              />
            </div>

            <h3 className="mt-2 text-sm text-gray-300 truncate group-hover:text-white transition">
              {video.name}
            </h3>
          </div>
        ))}

        {filteredVideos.length === 0 && (
          <p className="text-gray-400 text-center col-span-full">
            No videos found.
          </p>
        )}
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

const VideoPlayer = React.memo(({ video }) => {
  if (!video) {
    return <p className="text-gray-500">Video not found.</p>;
  }

  return (
    <video
      key={video.videoUrl}
      src={video.videoUrl}
      poster={video.poster}
      autoPlay
      controls
      playsInline
      className="max-h-[460px] h-full w-auto object-contain rounded-lg"
    />
  );
});
