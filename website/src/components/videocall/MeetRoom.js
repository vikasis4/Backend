import React, { useEffect, useCallback, useState } from 'react'
import { useVideoCallSocket } from '../../context/websockets/VideoCallSockets'
import { usePeerContext } from '../../context/websockets/Peer'

function MeetRoom() {

    const { socket } = useVideoCallSocket();
    const {myStream, setMedia, remoteStream} = usePeerContext();

    useEffect(() => {
     setMedia({video:true, audio:true});
    }, [])
    


    return (
        <>
            <div className="videopage-gap"></div>

            <div style={obj}>
                <h1 style={{ color: 'white' }}>{'remoteEmail'}</h1>
                <video ref={myStream} muted={true}/>
                <video ref={remoteStream} muted={true}/>
            </div>
        </>
    )
}

const obj = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    height: '100vh',
    backgroundColor: 'black'
}

export default MeetRoom