import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useVideoCallSocket } from './VideoCallSockets'

const PeerContext = React.createContext();

const usePeerContext = () => {
    return React.useContext(PeerContext)
}

const PeerProvider = (props) => {

    /////////////////////// STATES //////////////////////////////
    const socket = useVideoCallSocket().socket;
    const myStream = useRef(null);
    const remoteStream = useRef(null);
    const [media, setMedia] = useState({ video: false, audio: false });


    /////////////////////// PEER SETUP /////////////////////////////////
    const myPeer = useMemo(() => { return new Peer() }, [])
    const peers = {}

    useEffect(() => {
    },[socket, myStream])
    
    //////////////////////////// VIDEO INPUTS //////////////////////////

    // var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    // getUserMedia({ video: true, audio: true }, (mediaStream) => {
    //     myStream.current.srcObject = mediaStream;
    //     myStream.current.play();

    //     socket.on('user-connected', userId => {
    //         setTimeout(connectToNewUser,4000, userId, mediaStream);
    //     });

    //     myPeer.on('call', (call) => {
    //         const answerCall = confirm("Do you want to answer?");
    //         console.log('called me called');
    //         call.answer(mediaStream)
    //         call.on('stream', function (remoteStream) {
    //             remoteStream.current.srcObject = remoteStream
    //             remoteStream.current.play();
    //         });
    //     })
    // })

    //////////////////////////////////// SEND CALL FUNCTION //////////////////////////
    const connectToNewUser = (userId, mediaStream) => {
        console.log('korona go');
        const call = myPeer.call(userId, mediaStream);
        call.on('stream', userVideoStream => {
            remoteStream.current.srcObject = userVideoStream;
            remoteStream.current.play();
        })
    }

    ///////////////////////////// USER EXIT || HANDLE DISCONNECT //////////////////////
    // socket.on('user-disconnected', userId => {
    //     if (peers[userId]) peers[userId].close()
    // })

    return (
        <PeerContext.Provider value={{ myStream, remoteStream, setMedia, media, myPeer }}>
            {props.children}
        </PeerContext.Provider>
    )
}

export { usePeerContext, PeerProvider };