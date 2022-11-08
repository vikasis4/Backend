import React, {useState} from 'react'
import PanelContext from './PanelContext'

const PanelState = (props) => {

    const [verify, setVerify] = useState(false);
    

    return (
        <PanelContext.Provider value={{ verify, setVerify }} >
            {props.children}
        </PanelContext.Provider>
    )  
}

export default PanelState