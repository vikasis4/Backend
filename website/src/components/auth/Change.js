import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css'

const Change = (props) => {

    const navigate = useNavigate();
    const { code, id } = props


    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [change, setChange] = useState('');
    const clink = process.env.REACT_APP_LINK
    const path = process.env.REACT_APP_PATH

    const forward = async () => {
        if (password === cpassword) {
            await axios.post(clink + '/changepassword', { password, code, id })
                .then(function (response) {
                    if (response.data.status === 'yes') {
                        localStorage.setItem('token', response.data.token)
                        navigate('/')
                        window.location.reload()
                        alert('password changed successfully')
                    }
                })
            } else {
            alert('Password does not match')
        }
        setChange('chnaged')
    }

    return (
        <>
            <form style={{ display:'flex', justifyContent: 'center', placeItems: 'center', flexDirection: 'column'}} method="post" onSubmit={e => { e.preventDefault(); }} encType="application/json">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Password"
                    name="password"
                ></input>
                <input
                    type="password"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Confirm Password"
                    name="cPassword"
                ></input>
            </form>
            <button className="mob-forgot-btn3" type="submit" onClick={forward}>Change</button>
        </>
    )
}

export default Change