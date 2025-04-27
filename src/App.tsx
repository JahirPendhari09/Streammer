import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'


function App() {

  const [message, setMessage] = useState<string>('')
  const [room, setRoom] = useState<string>('')
  const [socketID, setSocketID] = useState<string>('')
  const [allMessages, setAllMessages] = useState<any>([])
  const [ roomName, setRoomName] = useState<any>('')


  const socket:any = useMemo( () => io('http://localhost:8080'), [] )

  useEffect(() => {
    socket.on("connect", ()=> {
      setSocketID(socket.id)
      console.log('connected')
    })

    socket.on('Welcome', (data:any) => {
      console.log(data)
    })

    socket.on('receive_message', (data:any) => {
      console.log(data)
      setAllMessages([...allMessages, data])
    })

    return () => {
      socket.disconnect()
    }
  },[])

  const handleSubmit = (e:any) => {
    e.preventDefault()
    socket.emit('message', {message, room})
    // setAllMessages([...allMessages, message])
    setMessage('')
  }

  const handleJoinClick = () => {
    socket.emit('join-room', roomName)
  }

  return (
    <>
      <div>
        <h1>Welcome to the Streammer</h1>
        <div>
          {socketID}
        </div>
        <div>
        <input placeholder='join room' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        <button onClick={handleJoinClick}>Join Room</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input placeholder='enter message' value={message} onChange={(e) => setMessage(e.target.value)} />
          <input placeholder='enter room' value={room} onChange={(e) => setRoom(e.target.value)} />
          <input type='submit' value='Send Message'  />
        </form>


        <div>
          {
            allMessages.length >0 && allMessages.map((message:any) => {
              return <p>{message}</p>
            })
          }
        </div>
      </div>
      
    </>
  )
}

export default App
