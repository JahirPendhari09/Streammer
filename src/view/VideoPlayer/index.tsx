import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export const VideoPlayer: React.FC = () => {
  const { filename } = useParams();
  const location = useLocation();

  const { title, poster } = location.state || {};

  const videoUrl = `${import.meta.env.VITE_SERVER_URL || 'http://localhost:8080'}/videos/stream/${filename}`;

  return (
    <div className="w-full h-screen bg-black text-white p-4">
      <Link
        to="/dashboard/home"
        className="flex items-center gap-2 text-gray-300 hover:text-white"
      >
        <IoArrowBack size={22} />
        <span>Back</span>
      </Link>

      <h1 className="text-2xl font-semibold mt-4 mb-4">{title || filename}</h1>

      <div className="w-full h-[80vh] bg-black rounded-lg overflow-hidden">
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-full object-contain"
          poster={poster}
        />
      </div>
    </div>
  );
};
