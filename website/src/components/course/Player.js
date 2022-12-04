import React, { useContext, useState, useEffect } from 'react'
import Part from './Part'
import Card from './Card.js'
import './player.css'
import ProfileContext from '../../context/profile/ProfileContext'
import VerifyContext from '../../context/verify/VerifyContext'
import CourseContext from '../../context/course/CourseContext'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'



const Player = () => {

    const navigate = useNavigate();
    const prowork = useContext(ProfileContext);
    const jango = useContext(CourseContext)
    const amaze = useContext(VerifyContext)
    const clink = process.env.REACT_APP_LINK;


    useEffect(() => {
        if (prowork.profile.subscription === "false") {
            navigate('/')
        } else {
            fetchData();
            async function fetchData() {
                await axios.get(clink + '/course')
                    .then(async (response) => {
                        jango.setCourse(response.data)
                    })
            }
        }
    }, [prowork])



    var one = '';
    var two = '';
    var dyta = '';
    var we = 1
    var be = 1
    if (jango.course) {

        dyta = jango.course;
        one = (dyta).map(
            (dyta) => {
                if (dyta.category === 't1') {
                    return <Card key={dyta._id} nig={we++} card={dyta} />
                }
            }
        )
        two = (dyta).map(
            (dyta) => {
                if (dyta.category === 't2') {
                    return <Card key={dyta._id} nig={be++} card={dyta} />
                }
            }
        )
    }

    return (
        <>
            <div className="player-main">
                <Helmet>
                    <title>{prowork.profile.current.name}</title>
                    <meta name="keywords" content="RankBoost player guidance mentorship iit jee" />
                    <meta name="description" content="Rankboost hls player" />
                </Helmet>
                <div className="player-cont">
                    <div className="player-top">
                        <div className="player">
                            {prowork.profile.subscription === 'true' ? <Part /> : 'PLEASE PURCHASE SUBSCRIPTION'}
                        </div>
                        <h1>{prowork.profile.current.name}</h1>
                        <div className="player-ones activate-dis">
                            <h1>RankBoost</h1>
                        </div>
                    </div>
                    <div className="player-bottom">
                        <div className="player-one">
                            <h1>Section 1 - Brainless creatures</h1>
                            <div className="player-one-list">
                                {one}
                            </div>
                        </div>
                        <div className="player-one">
                            <h1>Section 2 - Brainless creatures</h1>
                            <div className="player-one-list">
                                {two}
                                <div className="soros"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Player