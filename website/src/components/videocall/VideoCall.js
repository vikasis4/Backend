import React, { useEffect, useCallback } from 'react'
import { useVideoCallSocket } from '../../context/websockets/VideoCallSockets'
import { useNavigate } from 'react-router-dom';

const VideoCall = () => {

    const { socket } = useVideoCallSocket();
    const navigate = useNavigate();

    const [emailId, setEmailId] = React.useState('');
    const [roomId, setRoomId] = React.useState('');

    const handleJoin = () => {
        socket.emit('join-room', { emailId, roomId })
    };


    const joinedRoom = useCallback(
        (data) => {
            console.log('RoomJoined:- ' + data.roomId);
            navigate(`/videocall/${data.roomId}`)
        }, [navigate])

    useEffect(() => {
        socket.on('joined-room', joinedRoom)

        return () => {
            socket.off('joined-room', joinedRoom)
        }
    }, [joinedRoom, socket])


    return (
        <>
            <div className="videopage-gap"></div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '60rem', alignItems: 'center' }}>
                <input style={style} type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Enter Email" />
                <input style={style} type="number" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Enter Room code" />
                <button onClick={() => handleJoin()} style={style}>Enter Room</button>
            </div>
        </>
    )
}
const style = {
    border: '4px solid black',
    margin: 10,
    padding: '14px 28px 14px 28px',
    borderRadius: 6,
    fontFamily: 'Dosis',
    cursor: 'pointer'
}
export default VideoCall