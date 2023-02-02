import React from 'react';
import Stat from './Stat';
import newlogo from './newlogo.jpg'
import lg1 from './video.png';
import lg2 from './bok.png';
import lg3 from './mat.png';
import './comman.css'
import { useNavigate } from 'react-router-dom';

function ActiveHome() {

    const navigate = useNavigate()

    return (
        <>
            <div className="videopage-gap"></div>
            <div className="AH-one">

                <h2>RankBoost</h2>
                <h3>Your Personal mentor and life saver</h3>
                {/* <img src={newlogo} style={{ height: '80px', margin:'3rem 0 5rem 0' }} /> */}

                <div className="AH-one-cont">
                    <div className="AH-one-cont-element" onClick={() => navigate('/player')}>
                        <img src={lg1} />
                        <h1>Videos</h1>
                    </div>
                    <div className="AH-one-cont-element" onClick={() => navigate('/material')}>
                        <img src={lg2} />
                        <h1>Study Material</h1>
                    </div>
                    <div className="AH-one-cont-element" onClick={() => navigate('/task')}>
                        {/* <h6></h6> */}
                        <img style={{position: 'relative', bottom:'0rem'}} src={lg3} />
                        <h1 style={{position: 'relative', bottom:'0rem'}}>Reoprt</h1>
                    </div>
                </div>

            </div>
            {/* <Stat /> */}
        </>
    )
}

export default ActiveHome