import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'
import rocket from '../../svg/rocket.svg'
import jwt_decode from 'jwt-decode'
import logimg from './logi.jpg'
import ProfileContext from '../../context/profile/ProfileContext'


const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');
    const [token, setToken] = useState('');
    const clink = process.env.REACT_APP_LINK;
    const profile = useContext(ProfileContext);



    if (state === 'yes') {
        localStorage.setItem('token', token)
        navigate('/')
        window.location.reload();
    }
    if (state === 'noverify') {
        alert('OTP is not verified, go regitser page and register again')
        navigate('/register')
    }
    useEffect(() => {
        if (profile.profile.void === 'no') {
            navigate('/')
        }
    }, [profile])
    ////////////////////////////////////////////////////////////////////////////////////////////////
    const googlelogin = (response) => {

        profile.setDisp('block')

        var userobj = jwt_decode(response.credential);
        if (userobj.email_verified) {

            const dologin = async () => {
                await axios.post(clink + '/login', {
                    username: userobj.email,
                    type: 'google'
                })
                    .then((response) => {
                        setState(response.data.status)
                        setToken(response.data.token);
                        profile.setDisp('none')
                    })
            }
            dologin();
        }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "535610579205-d0dad7t8r0orbhtgb842l84bib80gg95.apps.googleusercontent.com",
            callback: googlelogin
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )
        google.accounts.id.renderButton(
            document.getElementById("signInDIV"),
            { theme: "outline", size: "large" }
        )
        google.accounts.id.renderButton(
            document.getElementById("signInDIVs"),
            { theme: "outline", size: "large" }
        )
    }, [])

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (state === 'no') {
            let masg = (state == 'no') ? alert('Wrong username or password') : "";
            setState('');
        }
    })

    async function registerUser(e) {
        e.preventDefault();
        profile.setDisp('block')

        await axios.post(clink + '/login', {
            username,
            password
        })
            .then(function (response) {
                if (response.data.val === 'none') {
                    profile.setDisp('none')
                    alert(`your email is not verified.  Verify your email with OTP by registering again`);
                    navigate('/register')
                }
                else if (response.data.status === 'no') {
                    profile.setDisp('none')
                    setState(response.data.status)
                }
                else {
                    profile.setDisp('none')
                    setState(response.data.status)
                    setToken(response.data.token);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var refuse = () => {
        navigate('/register')
    }
    var forget = () => {
        navigate('/forgot')
    }


    return (
        <>
            <div className="videopage-gap"></div>
            <div className="login-main deactivate-dis">

                <div className="login-center">
                    <div className="login-center-left">
                        <div className="login-rocket-txt">

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Righteous, sans-serif' }}>login using google</h3>
                            <div id="signInDiv"></div>

                        </div>
                        <div className="login-rocket">
                            <img src={rocket} />
                        </div>
                    </div>
                    <div className="login-center-right">
                        <div className="login-center-top">
                            <button id="login-btn" >LOGIN</button>
                            <button onClick={refuse} >REGISTER</button>
                        </div>
                        <div className="login-center-middle">
                            {screen.width < 480 ? <div className="login-google-mobile">
                                <h3>login using google</h3>
                                <div id="signInDIV"></div>
                            </div> :
                                <h3>Welcome to rank boost</h3>
                            }

                        </div>
                        <div className="login-center-last">

                            <form method="post" encType="application/json">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="off"
                                    placeholder="Email"
                                    name="username"
                                ></input>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="off"
                                    placeholder="Password"
                                    name="password"
                                ></input>
                            </form>
                            <button className="login-submit" type="submit" onClick={registerUser}>Login</button>
                            <a className="login-forgot" onClick={forget}><h3>Forgot Password</h3></a>

                        </div>
                    </div>
                </div>

                <div className="login-img-bar">
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
                            <h1>Login to your account</h1>
                        </div>
                        <div id="signInDIVs"></div>
                        <div className="mob-login-form">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                                placeholder="Email"
                                name="username"
                            ></input>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                                placeholder="Password"
                                name="password"
                            ></input>
                        </div>
                        <div className="mob-login-cred">
                            <h1 onClick={() =>{navigate('/register')}}>Register now</h1>
                            <h2 onClick={forget}>Forgot password ?</h2>
                        </div>
                    </div>
                    <div className="mob-login-submit">
                    <button className="mob-login-spl-btn" onClick={registerUser}>Login</button>
                    </div>
                </div>
            </div>
            {/* //////////////////////////////// MOBILE CODE ////////////////////////////////////////// */}
        </>
    )
}

export default Login;