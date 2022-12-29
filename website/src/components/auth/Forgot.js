import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './login.css'
import Change from './Change'
import rocket from '../../svg/rocket.svg'
import logimg from './login.jpg'
import ProfileContext from '../../context/profile/ProfileContext'
import { Helmet } from 'react-helmet'



const Forgot = () => {

    const [username, setUsername] = useState('');
    const [change, setChange] = useState('');
    const [id, setId] = useState('');
    const [otp, setOtp] = useState('');
    const [norm, setNorm] = useState('');
    const [seconds, setSeconds] = useState(240);
    const [col, setCol] = useState('black');
    const clink = process.env.REACT_APP_LINK;
    const profiles = useContext(ProfileContext)

    const forward = async () => {

        await axios.post(clink + '/endverify', { username })
            .then(function (response) {
                if (response.data.otp === 'sent') {
                    setId(response.data.id)
                    setChange('billy')
                }
                else if (response.data.otp === 'fail') {
                    alert('TRY AGAIN   SOMETHING WENT WRONG')
                }
                else if (response.data.otp === 'nouser') {
                    alert('USER NOT FOUND')
                }
            })
        setSeconds(120)
    }


    const resend = () => {

        if (seconds < 80) {
            forward()
        }
        else {
            setCol('red')
        }
    }

    /////////////////////////////////////////////////////////////////
    var timer;

    useEffect(() => {

        timer = setInterval(() => {
            setSeconds(seconds - 1);
            if (seconds === 0) {
                forward();
                setSeconds(120);
            }
        }, 1000)

        return () => clearInterval(timer)
    })
    ///////////////////////////////////////////////////////////////////////////////

    const verify = async () => {

        const blink = 69;
        profiles.setDisp('block')
        await axios.post(clink + '/otp', { id, otp, blink })
            .then((response) => {
                if (response.data.message === 'yes') {
                    setChange('verified')
                    profiles.setDisp('none')
                    setNorm(response.data.norm)
                }
                else if (response.data.message === 'no') {
                    profiles.setDisp('none')
                    alert('WRONG OTP')
                }
                else if (response.data.message === 'fail') {
                    profiles.setDisp('none')
                    alert('TRY AGAIN,  SOMETHING WENT WRONG')
                }
                else {
                    profiles.setDisp('none')
                }
            })
    }

    return (
        <>
            <div className="videopage-gap"></div>
            <div className="login-main deactivate-dis">
                <Helmet>
                    <title>RankBoost - Reset password</title>
                    <meta name="keywords" content="RankBoost reset password change change-password reset-password" />
                    <meta name="description" content="Reset password - change your password of rankboost account with the registered email. verify with otp and create new password. . check your email for password if you created your account with google sing up" />
                </Helmet>
                <div className="login-center">
                    <div className="login-center-left">
                        <div className="login-rocket-txt"><h2>RANK BOOST</h2></div>
                        <div className="login-rocket">
                            <img src={rocket} />
                        </div>
                        <div className="login-timer-txt">{change === 'billy' ? <h3 style={{ fontSize: '1.2rem', paddingBottom: '1rem', color: 'white' }}>OTP EXPIRES IN : {seconds}</h3> : ''}</div>
                    </div>
                    <div className="login-center-right">
                        <div className="login-center-top">
                            <button id="login-btn" >RESET PASSWORD</button>
                        </div>
                        <div className="login-center-middle">
                            {change === '' ?
                                <h3>Welcome to Rank boost</h3>
                                :
                                <h3 className="spam">Didn't get the OTP ? <br/> check the Spam Section</h3>
                            }
                        </div>
                        <div className="login-center-last">


                            {change === 'verified' ? <Change code={norm} id={id} /> : change === '' ? <>
                                <form method="post" onSubmit={e => { e.preventDefault(); }} encType="application/json">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        autoComplete="off"
                                        placeholder="Email"
                                        name="username"
                                    ></input>

                                </form>
                                <button className="login-submit" type="submit" onClick={() => forward()}>get otp</button></>
                                :
                                <>
                                    <form method="post" onSubmit={e => { e.preventDefault(); }} encType="application/json">
                                        
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            autoComplete="off"
                                            placeholder="Enter OTP"
                                            name="username"
                                        ></input>

                                    </form>
                                    <button className="login-submit" type="submit" onClick={() => verify()}>Submit</button>
                                    <a className="login-resend" onClick={() => resend()}>RESEND OTP</a>
                                    <h4 style={{ color: 'red', marginTop: '2rem', fontSize: '1.2rem', fontFamily: 'Righteous' }}>NEW OTP CAN BE GENERATED {seconds - 80 <= 0 ? 'NOW' : `IN  ${seconds - 80} SECONDS`}</h4>
                                </>}
                            {screen.width < 480 ?
                                <div className="login-timer-txt">{change === 'billy' ? <h3 style={{ fontSize: '1.2rem', paddingBottom: '1rem', color: 'black', fontSize: '2rem', fontWeight: 'bold' }}>OTP EXPIRES IN : {seconds}</h3> : ''}</div>
                                : ''
                            }
                        </div>
                    </div>

                </div>
                <div className="login-img-bar deactivate-dis">
                    <h1>A step closer to your dream IIT</h1>
                    <img src={logimg}></img>
                </div>
            </div>
            {/* //////////////////////////////// MOBILE CODE ////////////////////////////////////////// */}
            <div className=" activate-dis">
                <div className="mob-login">
                    <div className="mob-login-one">
                        <div className="mob-login-vector">
                            <img src={logimg}></img>
                            <h1>Reset Password</h1>
                        </div>
                        <div className="mob-login-form">
                            {change === 'verified' ? <Change code={norm} id={id} /> : change === '' ? <>
                                <form method="post" onSubmit={e => { e.preventDefault(); }} encType="application/json">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        autoComplete="off"
                                        placeholder="Email"
                                        name="username"
                                    ></input>

                                </form>
                                <button className="mob-forgot-btn" type="submit" onClick={forward}>get otp</button></>
                                :
                                <>
                                    <h3 className="spam">Didn't get the OTP ? <br/> check the Spam Section</h3>
                                    <form method="post" onSubmit={e => { e.preventDefault(); }} encType="application/json">

                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            autoComplete="off"
                                            placeholder="Enter OTP"
                                            name="username"
                                        ></input>

                                    </form>
                                    <a onClick={resend}>RESEND OTP</a>
                                    <h4 style={{ color: 'red', marginTop: '6rem', fontSize: '2.4rem', fontFamily: 'Dosis' }}>NEW OTP CAN BE GENERATED {seconds - 80 <= 0 ? 'NOW' : `IN  ${seconds - 80} SECONDS`}</h4>
                                </>}
                            {screen.width < 480 ?
                                <div >{change === 'billy' ? <h3 style={{ fontSize: '2rem', paddingBottom: '1rem', color: 'black', fontSize: '3rem', fontWeight: 'bold', fontFamily: 'Dosis', marginTop: '4rem' }}>OTP EXPIRES IN : {seconds}</h3> : ''}</div>
                                : ''
                            }
                            {change === '' || change === 'verified' ? '' :
                                <button className="mob-forgot-btn2" type="submit" onClick={verify}>Submit</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* //////////////////////////////// MOBILE CODE ////////////////////////////////////////// */}

        </>
    )
}

export default Forgot