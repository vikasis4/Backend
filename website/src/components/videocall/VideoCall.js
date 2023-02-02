import React, { useEffect, useCallback } from 'react'
import { useVideoCallSocket } from '../../context/websockets/VideoCallSockets'
import { useNavigate } from 'react-router-dom';
import ProfileContext from '../../context/profile/ProfileContext';
import { usePeerContext } from '../../context/websockets/Peer'

const VideoCall = () => {
    
    const { socket } = useVideoCallSocket();
    const navigate = useNavigate();
    const profile = React.useContext(ProfileContext)
    const {myPeer} = usePeerContext();

    const [id, setId] = React.useState('');
    const [roomId, setRoomId] = React.useState('');

    useEffect(() => {
        setRoomId(profile.profile.room);
    }, [profile])

    const handleJoin = () => {
        socket.emit('join-room', { userId: id, roomId })
    };

    myPeer.on('open', id => {
        setId(id)
    })

    const joinedRoom = (data) => {
        console.log('RoomJoined:- ' + data.roomId);
        navigate(`/videocall/${data.roomId}`)
    }

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
                <button onClick={() => handleJoin()} style={style}>Start Calling</button>
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