import { useState } from "react";
import { Modal } from "../../components/Modal";
import { FiPlus, FiLogIn } from "react-icons/fi";

export const Room = () => {
  const [rooms, setRooms] = useState([]);

  // modal states
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [joinRoom, setJoinRoom] = useState("");


  // Create Room
  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;
    console.log("Room Created");
  };

  const handleJoinRoom = async () => {
    if (!joinRoom.trim()) return;
    console.log("Joined Room");
  };

  return (
    <>
      <div className="w-full h-full p-6 bg-[#0e0e0e] text-white rounded-xl relative">

        <h2 className="text-xl font-semibold border-b border-gray-700 pb-2">
          Rooms
        </h2>

        {/* Top-right Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">

          <button
            onClick={() => setOpenCreate(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex gap-2 items-center cursor-pointer"
          >
            <FiPlus size={18}/> Create Room
          </button>

          <button
            onClick={() => setOpenJoin(true)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex gap-2 items-center cursor-pointer"
          >
            <FiLogIn size={18}/> Join Room
          </button>

        </div>

        {/* Rooms List */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[75vh] pr-2 no-scrollbar">

          {rooms.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">No rooms yet</p>
          )}

          {rooms.map((room: any, i: number) => (
            <div 
              key={i}
              className="bg-[#1a1a1a] p-4 border border-gray-700 rounded-lg hover:bg-[#232323] transition cursor-pointer text-center"
            >
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p className="text-gray-400 text-sm mt-2">{room.members?.length || 0} members</p>
            </div>
          ))}

        </div>
      </div>

      {/* ---------------- CREATE ROOM MODAL ---------------- */}
      <Modal isOpen={openCreate} onClose={()=>setOpenCreate(false)}>
        <div className="w-[350px] text-white">
          <h2 className="text-xl font-semibold text-center border-b pb-2">Create Room</h2>

          <input
            className="mt-4 w-full p-2 rounded bg-[#111] border border-gray-600 outline-none"
            placeholder="Enter room name..."
            value={roomName}
            onChange={(e)=>setRoomName(e.target.value)}
          />

          <button 
            onClick={handleCreateRoom}
            className="mt-4 w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer"
          >
            Create
          </button>
        </div>
      </Modal>

      {/* ---------------- JOIN ROOM MODAL ---------------- */}
      <Modal isOpen={openJoin} onClose={()=>setOpenJoin(false)}>
        <div className="w-[350px] text-white">
          <h2 className="text-xl font-semibold text-center border-b pb-2">Join Room</h2>

          <input
            className="mt-4 w-full p-2 rounded bg-[#111] border border-gray-600 outline-none"
            placeholder="Enter room name or room ID..."
            value={joinRoom}
            onChange={(e)=>setJoinRoom(e.target.value)}
          />

          <button
            onClick={handleJoinRoom}
            className="mt-4 w-full p-2 bg-green-600 hover:bg-green-700 rounded-md cursor-pointer"
          >
            Join Room
          </button>
        </div>
      </Modal>
    </>
  );
};
