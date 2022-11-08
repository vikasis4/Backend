import React, { useContext } from 'react'
import Facebook from '../../svg/Facebook'
import Instgram from '../../svg/Instagram'
import Youtube from '../../svg/Youtube'
import Twitter from '../../svg/Twitter'
import Linkedin from '../../svg/Linkedin'
import Telegram from '../../svg/Telegram'
import { useNavigate } from 'react-router-dom'
import ProfileContext from '../../context/profile/ProfileContext'
import './footer.css'

const Footer = () => {

    const navigate = useNavigate();
    const info = useContext(ProfileContext)

    return (
        <>
            <div className="footer-help">

                <div className="footer-main">

                    <div className="footer-one">

                        <div className="footer-ek">
                            <div>
                                <li><a onClick={() => { navigate('/') }} >Home</a></li>
                                <li><a onClick={() => { navigate('/about') }} >About us</a></li>
                                <li><a onClick={() => { navigate('/contact') }} >Contact us</a></li>
                            </div>
                        </div>
                        <div className="footer-do">
                            <div>
                                <li><a onClick={() => { navigate('/blogs') }} >Blogs</a></li>
                                <li><a onClick={() => {
                                    if (info.profile.subscription === 'true') {
                                        navigate('/course')
                                    }else{
                                        navigate('/courseinfo')
                                    }
                                }}>Course</a></li>
                                <li>{info.profile.void === 'no' ? <a onClick={() => { localStorage.removeItem("token"); window.location.reload() }}>Log out</a> : <a onClick={() => { navigate('/login') }}>Login</a>}</li>
                            </div>
                        </div>
                        <div className="footer-teen">
                            <div>
                                <li><a onClick={() => { navigate('/forgot') }}>Change Password</a></li>
                                <li><a onClick={() => { navigate('/support') }}>Customer support</a></li>
                                <li>{info.profile.void === 'no' ? <a onClick={() => { navigate('/support') }}>Ask a doubt</a> : <a onClick={() => { navigate('/register') }}>Register</a>}</li>
                            </div>
                        </div>
                    </div>
                    <div className="footer-line">
                        
                    </div>
                    <div className="footer-two">
                        <div className="footer-social">
                            <div className="social-class">

                                <ul>

                                    <li><a target="_blank" href="https://www.facebook.com/RankBoostEducation/"><Facebook /></a></li>
                                    <li><a target="_blank" href="https://www.instagram.com/rankboostedu/"><Instgram /></a></li>
                                    <li><a target="_blank" href="https://youtube.com/c/RanKBoosTsShubhamKumar"><Youtube /></a></li>
                                    <li><a target="_blank" href="https://twitter.com/RankboostS"><Twitter /></a></li>
                                    <li><a target="_blank" href="https://www.linkedin.com/in/shubham-kumar-sah-b53aa0224"><Linkedin /></a></li>
                                    <li><a target="_blank" href="https://t.me/RankBoostsYT"><Telegram /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-brand">
                            <span>rank boost @2022 All rights reserved &nbsp;&nbsp;{screen.width < 480 ? <br /> : ''} <a id="info-link" onClick={() => { navigate('/condition') }} style={{ borderBottom: '0.1rem solid white' }}>Terms & conditions</a> &nbsp;&nbsp; <a id="info-link" onClick={() => { navigate('/privacy') }} style={{ borderBottom: '0.1rem solid white' }}>privacy policy</a> &nbsp;&nbsp; <a id="info-link" onClick={() => { navigate('/refund') }} style={{ borderBottom: '0.1rem solid white' }}>Cancellation / refund policy</a></span>
                        </div>
                    </div>
                </div>
                <div className="f-gappers activate-dis"></div>
            </div>
        </>
    )
}

export default Footer