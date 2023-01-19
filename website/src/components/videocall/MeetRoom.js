import React, { useEffect, useCallback, useState } from 'react'
import { useVideoCallSocket } from '../../context/websockets/VideoCallSockets'
import { usePeerContext } from '../../context/websockets/Peer'
import ReactPlayer from 'react-player'

function MeetRoom() {

    const { socket } = useVideoCallSocket();
    const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream } = usePeerContext();
    const [myStream, setMyStream] = useState(null);
    const [remoteEmail, setRemoteEmail] = useState(null);

    const handleRoomJoined = useCallback(
        async (data) => {
            var { emailId } = data;
            const offer = await createOffer();
            socket.emit('call-user', { offer, emailId })
            console.log(emailId + ' has Joined the room');
            setRemoteEmail(emailId)
        }, [socket, createOffer])

    const handleIncomingCall = useCallback(
        async (data) => {
            const { offer, from } = data;
            const ans = await createAnswer(offer);
            socket.emit('call-accepted', { ans, from });
            setRemoteEmail(from)
            console.log("Incoming Call");
            console.log(offer);
            console.log(from);
        }, [createAnswer, socket])

    const handleCallAccepted = useCallback(
        async (data) => {
            const { ans } = data;
            console.log('call got accepted finally', ans);
            await setRemoteAnswer(ans);
        }, [])


    useEffect(() => {
        socket.on('New-User-Joined', handleRoomJoined);
        socket.on('incoming-call', handleIncomingCall);
        socket.on('call-accepted', handleCallAccepted);

        return () => {
            socket.off('New-User-Joined', handleRoomJoined);
            socket.off('incoming-call', handleIncomingCall);
            socket.off('call-accepted', handleCallAccepted);
        }
    }, [socket])

    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        await sendStream(stream)
        setMyStream(stream)
    }, [sendStream])
    useEffect(() => {
        getUserMediaStream()
    }, [getUserMediaStream])


    const handlenegotiation = useCallback((ev) => {
        const localOffer = peer.localDescription;
        socket.emit('call-user', { emailId: remoteEmail, offer: localOffer });
    }, [socket, remoteEmail])

    useEffect(() => {
        peer.addEventListener('negotiationneeded', handlenegotiation);
        return () => {
            peer.removeEventListener('negotiationneeded', handlenegotiation);
        }
    }, [handlenegotiation, peer])

    return (
        <>
            <div className="videopage-gap"></div>

            <div style={obj}>
                <ReactPlayer url={myStream} playing={true} muted={true} />
                <ReactPlayer url={remoteStream} playing={true} />
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