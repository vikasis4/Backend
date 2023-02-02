import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const VideoCallSocketContext = React.createContext();

export const useVideoCallSocket = () => {
    return React.useContext(VideoCallSocketContext)
}

export const VideoCallSocketProvider = (props) => {

    const socket = React.useMemo(()=>{
        return io('http://localhost:8080/videocall', { transports: ["websocket"] })
        // return io('https://wbb.rankboost.live/videocall', { transports: ["websocket"] })
    },[]);
    

    return (
        <VideoCallSocketContext.Provider value={{ socket }}>
            {props.children}
        </VideoCallSocketContext.Provider>
    )

}