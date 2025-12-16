import { useEffect, useState } from "react";
import { VideoDataType } from "../Home/types";
import { getCustomVideos } from "../../services/general";
import { Link } from "react-router-dom";

export const Search = () => {
  const [videos, setVideos] = useState<VideoDataType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="w-full h-full p-6 bg-[#0e0e0e] text-white rounded-xl relative">
      <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">
        Search
      </h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search videos..."
          className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-gray-700 
                     focus:border-blue-500 outline-none text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredVideos.map((video) => (
          <Link
            key={video.id}
            to={`/dashboard/watch/${video.filename}`}
            state={{ title: video.name, poster: video.poster }}
            className="group"
          >
            <div className="w-full h-40 rounded-xl overflow-hidden bg-black">
              <img
                src={video.poster}
                className="w-full h-full object-cover rounded-xl group-hover:opacity-80 transition"
              />
            </div>

            <h3 className="mt-2 text-sm text-gray-300 truncate group-hover:text-white transition">
              {video.name}
            </h3>
          </Link>
        ))}

        {/* ---- No results ---- */}
        {filteredVideos.length === 0 && (
          <p className="text-gray-400 text-center col-span-full">
            No videos found.
          </p>
        )}
      </div>
    </div>
  );
};
