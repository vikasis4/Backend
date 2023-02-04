import React, { useState, useEffect } from 'react'
import BroadcastingContext from './BroadcastingContext';
import io from 'socket.io-client'

const BroadcastingState = (props) => {

    const [socket, setSocket] = useState();
    const [rmessages, setRmessages] = useState([]);
    const [live, setLive] = useState(0);

    useEffect(() => {
        // setSocket(io('http://localhost:4000/admin'));
        setSocket(io('https://wbb.rankboost.live/admin'));
    }, [])

    //////////////////////////////////////////////////////////////////////////////////////
    if (socket) {
    
        socket.on("data", (data) =>{
            if (rmessages[rmessages.length - 1] === data) {
                ///
            }else{
                rmessages.push(data);
                setRmessages(rmessages);
            }
        })
        socket.on("live-listen", (listener) =>{
            setLive(listener);
        })
       
    }
    /////////////////////////////////////////////////////////////////////////////////////
    const sendText = (data) => {
    }
    



    return (
        <BroadcastingContext.Provider value={{ sendText,  rmessages, live }} >
            {props.children}
        </BroadcastingContext.Provider>
    )
}
export default BroadcastingState;