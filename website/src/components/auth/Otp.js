import React, { useState, useEffect } from 'react'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Otp = (props) => {

    const [otp, setOtp] = useState('');
    const [tokn, setTokn] = useState('');
    const [valid, setValid] = useState('');
    const [seconds, setSeconds] = useState(120);
    const navigate = useNavigate();
    const clink = process.env.REACT_APP_LINK




    const { id } = props;


    useEffect(() => {
        if (valid === 'yes') {
            localStorage.setItem('token', tokn)
            alert("Registered successfully")
            navigate('/price')
            window.location.reload()
        }
    },[valid])

    const sendotp = async () => {


        var blink = 90;
        await axios.post(clink + '/otp', { otp, id, blink })
            .then(response => {
                if (response.data.message === 'yes') {
                    setValid(response.data.message);
                    setTokn(response.data.token)
                } else if (response.data.message === 'no') {
                    alert('WRONG')
                }
                else {
                    console.log('something went wrong');
                }
            })

    }
    const reotp = async () => {

        if (seconds < 70) {
            await axios.post(clink + '/endverify', { id })
            setSeconds(120);
        }
        else {
            alert(`OTP can be resend after ${seconds - 70}`)
        }
    }

    var timer;
    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds - 1);
            if (seconds === 0) {
                reotp();
                setSeconds(120);
            }
        }, 1000)
        return () => clearInterval(timer)
    })


    return (
        <>
            <div className="deactivate-dis">
                <h1 className='spam'>Didn't recieved the OTP ? <br />Check the Spam Section</h1>
                <form method="post" onSubmit={e => { e.preventDefault(); }} encType="application/json">
                    <input
                        type="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        autoComplete="off"
                        placeholder="OTP"
                        name="otp"
                        style={{ width: '80%' }}
                    ></input>
                </form>
                <button className="login-submit" type="submit" onClick={sendotp}>Submit</button>
                <a className="resend" onClick={reotp}>Resend Otp</a>
                <div className="otp-exp">
                    <h3 id='e' style={{ color: 'black', marginTop: '2rem', fontFamily: `"Roboto", sans-serif`, fontSize: '1.2rem' }}>{seconds < 5 && seconds > 0 ? 'EXPIRED, New OTP will be generated' : `OTP will expire in ${seconds}`}</h3>
                </div>
            </div>

            {/* MOBILE DEV  */}

            <div className="activate-dis">
                <div className="mkijn">
                    <form className="MOB-otp" method="post" onSubmit={e => { e.preventDefault(); }} encType="application/json">
                        <h1 className='spam'>Didn't recieved the OTP ? <br />Check the Spam Section in gmail</h1>
                        <input
                            type="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            autoComplete="off"
                            placeholder="OTP"
                            name="otp"
                        ></input>
                        <div className="MOB-otp-exp">
                            <h3 id='e'>{seconds < 5 && seconds > 0 ? 'EXPIRED, New OTP will be generated' : `OTP will expire in ${seconds}`}</h3>
                            <a className="MOB-resend" onClick={reotp}>Resend Otp</a>
                        </div>
                    </form>
                    <button className="MOB-Plogin-submit" type="submit" onClick={sendotp}>Submit</button>
                </div>
            </div>

        </>
    )
}

export default Otp