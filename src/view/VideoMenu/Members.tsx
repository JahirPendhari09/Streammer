import MemberCard from "./MemberCard"
import { HiOutlineVideoCamera, HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { FiMic, FiMicOff } from "react-icons/fi";


const Members = ({
  cameraStream, 
  cameraOn, 
  micOn, 
  peers,
  toggleMic, 
  toggleCamera, 
}) => {
  return (
    <div className='w-full h-full'>
      <div className='h-full w-full flex flex-col gap-4 overflow-y-auto whitespace-nowrap scroll-smooth no-scrollbar'>
        <MemberCard 
          name="You"
          videoStream={cameraStream}
          cameraOn={cameraOn}
          micOn={micOn}
          muted 
        />

        {Array.from(peers.values()).map((peer) => (
          <MemberCard
            key={peer.peerId}
            name="User"
            videoStream={peer.videoStream}
            cameraOn={peer.cameraOn}
            micOn={peer.micOn}
          />
        ))}

      </div>

      <div className='w-full h-[50px] absolute bottom-0'>
        <div className="flex justify-start gap-4 ml-4">
          <button onClick={toggleMic} className=" bg-gray-700 rounded h-10 px-2 cursor-pointer">
            {micOn ? <FiMic/> : <FiMicOff color="red"/>}
          </button>
      
          <button onClick={toggleCamera} className="p-2 bg-gray-700 h-10 rounded cursor-pointer" >
            {cameraOn ? <HiOutlineVideoCamera/> : <HiOutlineVideoCameraSlash color="red"/>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Members


