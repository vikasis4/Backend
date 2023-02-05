import React, { useContext, useEffect, useState } from 'react'
import './profilepage.css'
import ProfileContext from '../../context/profile/ProfileContext'
import { useNavigate } from 'react-router-dom'
import img from './20943798.jpg'
import user from '../navbar/user.png'

const ProfilePage = () => {

    const profile = useContext(ProfileContext)
    const navigate = useNavigate();
    const [kart, setKart] = useState([])


    useEffect(() => {
        if (localStorage.getItem('reload-facility') === '89307988vikasREF') {
            setKart(profile.profile.subarray)
        }
        else {
            if (profile.profile.void === '') {
                navigate('/')
                alert(`Only loged in users can ask doubt and query `)
            }
        }
    }, [profile])
    useEffect(() => {
        
    },[profile])

    const about = () => {
        if (profile.profile.subscription === 'true') {
            navigate('/course')
        }
        else {
            navigate('/courseinfo')
        }
    }
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('reload-facility')
        navigate('/')
        window.location.reload()
    }


    return (
        <>
            <div className="videopage-gap"></div>
            <div className="profile-cont">
                <div className="profile-main-one">
                    <div className="profile-one">
                        {profile.profile.img === 'empty' ?
                            <img src={user}></img>
                            :
                            <img src={profile.profile.img}></img>
                        }
                        <h1>{profile.profile.username}</h1>
                    </div>
                    <div className="profile-two">
                        <img src={img}></img>
                    </div>
                </div>
                <h1 className="profile-gmail activate-dis">{profile.profile.username}</h1>
                <div className="profile-main-two">
                    <div className="profile-fst">


                        {
                            profile.profile.subscription === 'true' ?
                                <>
                                <h1>Your Subscribed courses</h1>
                                <ul>
                                {kart.find(({ name }) => name === "combo") || kart.find(({ name }) => name === "2023CC") ? <li>*Jee Mains + Advance 2023 Mentorship</li> : ""}
                                {kart.find(({ name }) => name === "material") ? <li>* Jee study material</li> : ""}
                            </ul>
                                </>
                                :
                                <>
                                <h1>No course purchased</h1>
                                <button onClick={() => navigate('price')}>Purchase Now</button>
                                </>
                        }


                    </div>
                    <div className="profile-element profile-hover">
                        <h1 onClick={() => { navigate('/forgot') }}>Change password</h1>
                    </div>
                    <div className="profile-element profile-hover">
                        <h1 onClick={() => { about() }}>Course</h1>
                    </div>
                    <div className="profile-element profile-hover">
                        <h1 onClick={() => { navigate('/contact') }}>Contact us</h1>
                    </div>
                    <div className="profile-element profile-hover">
                        <h1 onClick={() => { navigate('/support') }}>Customer support</h1>
                    </div>
                    <div className="profile-element profile-hover">
                        <h1 onClick={() => { logout() }}>Logout</h1>
                    </div>
                </div>
            </div>
            <div className="videopage-gap"></div>
        </>
    )
}

export default ProfilePage