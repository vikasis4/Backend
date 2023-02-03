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
    const kart = prowork.profile.subarray;


    useEffect(() => {
        if (prowork.profile.void === 'no') {
            if (prowork.profile.subscription === "false") {
                navigate('/')
            }
            else if (kart.find(({ name }) => name === "2023") || kart.find(({ name }) => name === "combo")) {
                fetchData();
                async function fetchData() {
                    await axios.get(clink + '/course')
                        .then(async (response) => {
                            jango.setCourse(response.data)
                        })
                }
            } else {
                alert('Purchase main course to access this section')
            }
        } else {
            navigate('/')
        }
    }, [prowork])



    var one = '';
    var two = '';
    var three = '';
    var four = '';
    var dyta = '';
    var we = 1
    var be = 1
    var te = 1
    var ze = 1
    if (jango.course) {

        dyta = jango.course;
        one = (dyta).map(
            (dyta) => {
                if (dyta.category === 's1') {
                    return <Card key={dyta._id} nig={we++} card={dyta} />
                }
            }
        )
        two = (dyta).map(
            (dyta) => {
                if (dyta.category === 's2') {
                    return <Card key={dyta._id} nig={be++} card={dyta} />
                }
            }
        )
        three = (dyta).map(
            (dyta) => {
                if (dyta.category === 's3') {
                    return <Card key={dyta._id} nig={te++} card={dyta} />
                }
            }
        )
        four = (dyta).map(
            (dyta) => {
                if (dyta.category === 's4') {
                    return <Card key={dyta._id} nig={ze++} card={dyta} />
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
                            <h1 style={{ color: 'var(--s2)' }}>Section 1 - Confidence || Health || Social Media || Mindset || Study routine</h1>
                            <div className="player-one-list">
                                {one}
                            </div>
                        </div>
                        <div className="player-one">
                            <h1 style={{ color: 'var(--s2)' }}>Section 2 - Major Mistakes to avoid for jee Mains & Advance</h1>
                            <div className="player-one-list">
                                {two}
                            </div>
                        </div>
                        <div className="player-one">
                            <h1 style={{ color: 'var(--s2)' }}>Section 3 - Strategy & Study tips for jee Mains 2023</h1>
                            <div className="player-one-list">
                                {three}
                            </div>
                        </div>
                        <div className="player-one">
                            <h1 style={{ color: 'var(--s2)' }}>Section 4 - Strategy & Study Tips for jee Advance 2023</h1>
                            <div className="player-one-list">
                                <div className="frozen">
                                    {/* {four} */}
                                    <h3>This Section will unlock after JEE Mains second attempt 2023.<br />This section has 6 videos</h3>
                                </div>
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