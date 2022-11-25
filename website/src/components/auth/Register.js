import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import "./register.css"
import { useNavigate } from 'react-router-dom'
import Rocket from '../../svg/Rocket.tsx'
import validator from 'validator'
import Otp from './Otp'
import jwt_decode from 'jwt-decode'
import logimg from './login.jpg'
import ProfileContext from '../../context/profile/ProfileContext'

const Register = () => {

    const navigate = useNavigate();
    const profile = useContext(ProfileContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState('');
    const [pto, setPto] = useState(false);
    const [id, setId] = useState('');
    const [token, setToken] = useState('');
    const [namee, setNamee] = useState('');
    const [refral, setRefral] = useState(localStorage.getItem('refral'))
    const clink = process.env.REACT_APP_LINK;



    /////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (profile.profile.void === 'no') {
            navigate('/')
        }

        if (valid === 'yup') {
            localStorage.setItem('token', token)
            if (localStorage.getItem('refral')) {
                localStorage.removeItem('refral')
            }
            alert("Registered successfully and new password is sent to your gmail account")
            navigate('/')
            window.location.reload()
        }
    })


    const googlesignup = (response) => {

        profile.setDisp('block')

        var userobj = jwt_decode(response.credential);

        if (userobj.email_verified) {
            var pass = userobj.jti.slice(0, 10);


            const googlestart = async () => {

                await axios.post(clink + '/register', {
                    username: userobj.email,
                    password: pass,
                    type: 'google',
                    name: userobj.given_name,
                    img: userobj.picture,
                    refral: refral,
                    namee: userobj.given_name
                })
                    .then((response) => {
                        if (response.data.message === 'yup') {
                            profile.setDisp('none')
                            setValid(response.data.message);
                            setToken(response.data.token);
                        }
                        else if (response.data.message === 'no') {
                            profile.setDisp('none')
                            alert('email is already registered')
                        }
                        else {
                            profile.setDisp('none')
                        }
                    })
            }
            googlestart();
        }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "535610579205-d0dad7t8r0orbhtgb842l84bib80gg95.apps.googleusercontent.com",
            callback: googlesignup
        });

        google.accounts.id.renderButton(
            document.getElementById("signUpDiv"),
            { theme: "outline", size: "large" }
        )
        google.accounts.id.renderButton(
            document.getElementById("signUpDivs"),
            { theme: "outline", size: "large" }
        )
        google.accounts.id.renderButton(
            document.getElementById("signUpDIV"),
            { theme: "outline", size: "large" }
        )

    }, [])


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (valid === 'no') {
            let msg = (valid == "no") ? alert("email adress is already registered") : '';
            setValid('')
        }
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function registerUser(e) {
        e.preventDefault();
        profile.setDisp('block')


        if (password.length > 8 && validator.isEmail(username)) {

            await axios.post(clink + '/register', {
                username,
                password,
                refral,
                namee
            })
                .then(function (response) {
                    if (response.data.otp === 'sent') {
                        profile.setDisp('none')
                        setPto(true)
                        setId(response.data.id)
                    }
                    else if (response.data.message === 'no') {
                        profile.setDisp('none')
                        setValid(response.data.message);
                    }
                    else {
                        profile.setDisp('none')
                    }
                })
                .catch(function (error) {
                    profile.setDisp('none')
                    console.log(error);
                });
        }
        else {
            if (validator.isEmail(username)) {
                profile.setDisp('none')
                alert('make sure your Password should be atleast 8 characters')
            }
            else {
                profile.setDisp('none')
                alert('Enter correct Email')
            }
            profile.setDisp('none')
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var refused = () => {
        navigate('/login')
    }


    return (
        <>
            <div className="videopage-gap"></div>
            <div className="login-main deactivate-dis">

                <div className="login-center">
                    <div className="login-center-left">
                        <div className="login-rocket-txt">

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>create account</h3>
                            <div id="signUpDiv"></div>

                        </div>
                        <div className="login-rocket">
                            <Rocket />
                        </div>
                    </div>
                    <div className="login-center-right">
                        <div className="login-center-top">
                            <button onClick={refused} >LOGIN</button>
                            <button id="login-btn" >REGISTER</button>
                        </div>
                        <div className="login-center-middle">
                            {screen.width < 480 ? <div className="login-google-mobile">
                                <h3>register using google</h3>
                                <div id="signUpDIV"></div>
                            </div> :
                                <h3>Welcome to rank boost</h3>
                            }
                        </div>
                        <div className="login-center-last">

                            {pto ? <Otp id={id} /> : <>
                                <form method="post" encType="application/json">
                                    <input
                                        type="name"
                                        value={namee}
                                        onChange={(e) => setNamee(e.target.value)}
                                        autoComplete="off"
                                        placeholder="Name"
                                        name="Name"
                                    ></input>
                                    <input
                                        type="email"
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
                                <button className="login-submit" type="submit" onClick={registerUser}>Register</button>
                            </>}

                        </div>
                    </div>

                </div>
                <div className="login-img-bar deactivate-dis ">
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
                            <h1>Create your account</h1>
                        </div>
                        {pto ? <Otp id={id} /> : <>
                            <div id="signUpDivs"></div>
                            <div className="mob-login-form">
                                <input
                                    type="name"
                                    value={namee}
                                    onChange={(e) => setNamee(e.target.value)}
                                    autoComplete="off"
                                    placeholder="Name"
                                    name="Name"
                                ></input>
                                <input
                                    type="email"
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
                            <div style={{display: 'flex', justifyContent: 'center', placeItems:'center'}} className="mob-login-submit">
                                <button  onClick={registerUser}>Register</button>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
            {/* //////////////////////////////// MOBILE CODE ////////////////////////////////////////// */}
        </>
    )
}

export default Register