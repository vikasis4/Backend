import React from 'react'
import PanelContext from '../../context/panelentry/PanelContext'
import './livepro.css'

function LivePro() {

    const panel = React.useContext(PanelContext);
    // console.log(panel.websocket);
    var live = panel.websocket.livearray;
    const [maps, setMaps] = React.useState(null)

    React.useEffect(() => {

        if (live) {
            setMaps(
                live.map((live) => {
                    return (
                        <>
                            <div className="livepro-map">
                                <h1>Email :- {live.email}</h1>
                            </div>
                        </>
                    )
                })
            )
        }
    }, [panel])


    // console.log(map);

    return (
        <>
            <div className="livepro">
                <h1 style={{ fontFamily: 'Dosis', borderBottom: '2px solid black', paddingBottom: '1rem' }}>Users Online Right Now :- <span style={{ color: 'green' }}>{panel.websocket.count}</span></h1>

{panel.websocket.count === 0 ? <h1>No user Online Right Now</h1> : maps}

            </div>
        </>
    )
}

export default LivePro