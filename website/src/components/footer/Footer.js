import React, { useContext } from 'react'
import facebook from '../../svg/facebook.svg'
import instgram from '../../svg/instagram.svg'
import youtube from '../../svg/youtube.svg'
import twitter from '../../svg/twitter.svg'
import linkedin from '../../svg/linkedin.svg'
import telegram from '../../svg/telegram.svg'
import { useNavigate } from 'react-router-dom'
import ProfileContext from '../../context/profile/ProfileContext'
import './footer.css'
import icon from '../support/favicon.ico'

const Footer = () => {

    const navigate = useNavigate();
    const info = useContext(ProfileContext)

    return (
        <>
            <div className="footer-help">

                <div className="footer-main">

                    <div className="footer-three">
                        <h1 className="fotter-t-t">Contact</h1>
                        <div className="footer-th-t">
                            <h1>rankboosteducation@gmail.com</h1>
                            <h1>kumarshubham6089@gmail.com</h1>
                            {/* <h1>vikasisgen@gmail.com</h1> */}
                        </div>
                    </div>

                    <div className="footer-one">



                        <div className="footer-ek">
                            <h1>Usefull Links</h1>
                            <div>
                                <li><a onClick={() => { navigate('/') }} >Home</a></li>
                                <li><a onClick={() => {
                                    if (info.profile.subscription === 'true') {
                                        navigate('/course')
                                    } else {
                                        navigate('/price')
                                    }
                                }}>Course</a></li>
                                <li><a onClick={() => { navigate('/blogs') }} >Blogs</a></li>
                                <li><a onClick={() => { navigate('/books') }} >Books</a></li>
                                <li><a onClick={() => { navigate('/refral') }} >Referral</a></li>
                                <li>{info.profile.void === 'no' ? <a onClick={() => { navigate('/profile') }}>Account</a> : <a onClick={() => { navigate('/login') }}>Account</a>}</li>
                                <li>{info.profile.void === 'no' ? <a onClick={() => { navigate('/support') }}>Customer Support</a> : <a onClick={() => { navigate('/register') }}>Register</a>}</li>
                                <li><a onClick={() => { navigate('/forgot') }}>Change Password</a></li>
                                <li><a onClick={() => { navigate('/support') }}>Customer support</a></li>
                                {/* <li><a onClick={() => { navigate('/guidance-personal') }} >Personal 1-1 Guidance</a></li> */}
                            </div>
                        </div>
                        <div className="footer-do">
                            <h1>Business</h1>
                            <div>
                                <li onClick={() => { navigate('/about') }} >About us</li>
                                <li onClick={() => { navigate('/contact') }} >Contact us</li>
                                <li onClick={() => { navigate('/privacy') }} >Privacy policy</li>
                                <li onClick={() => { navigate('/condition') }} >Terms & conditions</li>
                                <li onClick={() => { navigate('/refund') }} >Cancellation / refund policy</li>
                            </div>
                        </div>
                        <div className="footer-teen">
                            <h1>Follow Us On</h1>
                            <div className="footer-social">
                                <div className="social-class">
                                    <ul>
                                        <li><a target="_blank" href="https://www.facebook.com/RankBoostEducation/"><img src={facebook} /></a></li>
                                        <li><a target="_blank" href="https://www.instagram.com/rankboostedu/"><img src={instgram} /></a></li>
                                        <li><a target="_blank" href="https://twitter.com/RankboostS"><img src={twitter} /></a></li>
                                        <li><a target="_blank" href="https://www.linkedin.com/in/shubham-kumar-sah-b53aa0224"><img src={linkedin} /></a></li>
                                        <li><a target="_blank" href="https://youtube.com/c/RanKBoosTsShubhamKumar"><img src={youtube} /></a></li>
                                        <li><a target="_blank" href="https://t.me/RankBoostsYT"><img src={telegram} /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-ek-aur">
                                <img alt="rankboost" style={{height: "8rem", width:'8rem'}} src={icon}></img>
                                <h1>RankBoost</h1>
                            </div>
                        </div>
                    </div>
                    <div className="footer-two">
                        <div className="footer-brand">
                            <span>rank boost @2022 All rights reserved</span>
                        </div>
                    </div>
                </div>
                <div className="f-gappers activate-dis"></div>
            </div>
        </>
    )
}

export default Footer