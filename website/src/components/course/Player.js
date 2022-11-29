import React, { useContext, useState, useEffect } from 'react'
import Part from './Part'
import './player.css'
import ProfileContext from '../../context/profile/ProfileContext'
import { useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet'



const Player = () => {

    const navigate = useNavigate();
    const prowork = useContext(ProfileContext);


    const simon = () => {
        navigate('/course')
    }

    useEffect(() => {
        if (prowork.profile.subscription === "false") {
            navigate('/')
        }
    })


    return (
        <>
            <div className="player-main">
                <Helmet>
                    <title>{prowork.profile.current.name}</title>
                    <meta name="keywords" content="RankBoost player guidance mentorship iit jee" />
                    <meta name="description" content="Rankboost hls player" />
                </Helmet>
                <div className="videopage-gap"></div>
                <div className="player-cont">

                    <div className="player">
                        {prowork.profile.subscription === 'true' ? <Part /> : 'PLEASE PURCHASE SUBSCRIPTION'}
                    </div>

                    <div className="player-two">
                        <div className="p21">

                            <h2> Section 1 :- {prowork.profile.current.category}</h2>
                            <h1>{prowork.profile.current.name}</h1>
                        </div>
                        <div className="p22">
                            <button onClick={simon} className="player-btn">Go Back</button>
                        </div>
                    </div>

                </div>
                <div className="player-gap"></div>
            </div>
        </>
    )
}

export default Player