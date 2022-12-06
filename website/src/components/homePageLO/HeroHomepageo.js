import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./herohomepageo.css";
import animated from './main.jpg';
import cone from './cone.jpg';
import cone4 from './cone4.jpg';
import cone3 from './cone3.jpg';
import cone5 from './cone5.jpg';
import course from './course.png';
import ProfileContext from '../../context/profile/ProfileContext';
import telegram from '../../svg/telegram.svg'



const HeroHomepageo = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const profile = useContext(ProfileContext);


    if (location.pathname.slice(0, 12) === '/refral-link') {
        if (!localStorage.getItem('refral')) {
            localStorage.setItem('refral', location.pathname.slice(13))
        }
    }




    return (
        <>
            <div style={{ backgroundColor: "var(--s1)" }} className="videopage-gap herohomepage-for-m"></div>

            <div className="herohomepage">
                <div className="herohomepage-for-m">
                    <h1>RankBoost</h1>
                    <h2> India's best JEE guidance platform</h2>
                </div>
                <div className="herohomepage-main">

                    <div className="herohomepage-first">
                        <div className="herohomepage-first-txt deactivate-dis">
                            <h1><span style={{ color: 'var(--c2)' }}> JEE's </span>best <br /> Guidance platform</h1>
                        </div>
                        {/* ///////////////////// */}
                        <div className="herohero-mobile activate-dis">
                            <div className="herohero-flex">
                                <div className="herohero-mobile-one">
                                    <img src={cone4}></img>
                                    <div className="herohero-mobile-cont">
                                        <h1>400+ Jee Mains <br /> selections</h1>
                                    </div>
                                </div>
                                <div className="herohero-mobile-one">
                                    <img src={cone5}></img>
                                    <div className="herohero-mobile-cont">
                                        <h1>200+ Jee Advanced <br /> selections</h1>
                                    </div>
                                </div>
                                <div className="herohero-mobile-one">
                                    <img src={cone3}></img>
                                    <div className="herohero-mobile-cont">
                                        <h1>2200+ Students <br /> Guided</h1>
                                    </div>
                                </div>
                                <div className="herohero-mobile-one">
                                    <img src={cone}></img>
                                    <div className="herohero-mobile-cont">
                                        <h1>Guidance is the<br />Key to success</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ///////////////////// */}
                        <div className="herohomepage-course-list">
                            {
                                profile.profile.subscription === 'true' ?
                                    <div className="join-tele">
                                        <img src={telegram}></img>
                                        <h1>Join Telegram</h1>
                                        <h2>For all the students who have enrolled in courses, They have to join this telegram channel for various facilities and future updates</h2>
                                        <a href="https://t.me/+LZFARaWHr80yNzNl" target="_blank">Join Now</a>
                                    </div>
                                    :
                                    <>
                                        <div className="herohomepage-first-course">
                                            <img src={course}></img>
                                            <div className="herohomepage-cbtwn">
                                                <h6>IIT-JEE Mentorship Courses</h6>
                                                <p className="htdocs-1"> Special 50% off - Limited time offer</p>
                                                <div className="herohomepage-cbt-panel">
                                                    <button onClick={() => { navigate('/price') }} className="herohomepage-main-half-btn">View all courses</button>
                                                    <div className="herohomepage-fine-line"></div>
                                                </div>
                                                <div className="activate-dis">
                                                    <ul>
                                                        <li>&#10003; Guidance</li>
                                                        <li>&#10003; Doubt session</li>
                                                        <li>&#10003; 23+ Doubt videos</li>
                                                        <li>&#10003; 1-1 personal guidance</li>
                                                        <li>&#10003; Study material</li>
                                                        <li>&#10003; Councelling</li>
                                                        <li>&#10003; Short notes + PYQ</li>
                                                        <li>&#10003; Mains + Advance strategy</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </>}
                        </div>
                    </div>

                    <div className="herohomepage-second">
                        <div className="herohomepage-second-img">
                            <img src={animated}></img>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}


export default HeroHomepageo;