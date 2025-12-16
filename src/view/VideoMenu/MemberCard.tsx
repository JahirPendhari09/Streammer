import React, { useEffect, useRef } from 'react'

const MemberCard:React.FC<any> = ({ name, videoStream, cameraOn, micOn, muted }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = videoStream || null;
    }
  }, [videoStream]);

  return (
    <div className='h-full w-full border-2 min-h-[150px] rounded-xl bg-blue-300 overflow-hidden'>
      <div className='w-full h-full flex items-center justify-center'>
        <video
          ref={ref}
          autoPlay
          playsInline
          muted={muted}
          className={`w-full h-full object-cover ${cameraOn ? "" : "hidden"}`}
        />
        {!cameraOn && (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">
          👤
          </div>
        )}

        <div className="absolute bottom-1 left-1 bg-black/70 px-2 py-1 text-xs rounded">
          {name} {micOn ? "🎤" : "🔇"} {cameraOn ? "📹" : "📷"}
        </div>
      </div>      
    </div>
  )
}

export default MemberCard