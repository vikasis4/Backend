import React, { useMemo, useEffect, useState, useCallback } from 'react';

const PeerContext = React.createContext();

const usePeerContext = () => {
    return React.useContext(PeerContext)
}

const PeerProvider = (props) => {

    const [remoteStream, setRemoteStream] = useState(null)

    const peer = useMemo(
        () =>
            new RTCPeerConnection({
                iceServers: [{
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ]
                }]
            })
        , [])
    const createOffer = async () => {
        var offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }
    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    }
    const setRemoteAnswer = async (answer) => {
        await peer.setRemoteDescription(answer);
    }
    const sendStream = async (stream) => {
        const tracks = stream.getTracks();
        for (const track of tracks) {
            peer.addTrack(track, stream)
        }
    }
    const recieveStream = useCallback((ev) => {
        const streams = ev.streams;
        setRemoteStream(streams[0]);
    },[])
   
    useEffect(() => {
        peer.addEventListener('track', recieveStream);
        return()=>{
            peer.removeEventListener('track', recieveStream);
        }
    }, [recieveStream, peer])


    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream }}>
            {props.children}
        </PeerContext.Provider>
    )
}

export { usePeerContext, PeerProvider };