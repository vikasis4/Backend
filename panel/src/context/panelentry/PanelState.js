import React, {useState} from 'react'
import PanelContext from './PanelContext'

const PanelState = (props) => {

    const [verify, setVerify] = useState(false);
    const [websocket, setWebsocket] = useState({})
    

    return (
        <PanelContext.Provider value={{ verify, setVerify, websocket, setWebsocket }} >
            {props.children}
        </PanelContext.Provider>
    )  
}

export default PanelState