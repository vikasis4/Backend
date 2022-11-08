import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileContext from '../../context/profile/ProfileContext'
import './courses.css'

const Courses = () => {

    const profile = useContext(ProfileContext);
    const navigate = useNavigate();
    const [subs, setSubs] = useState([]);
    const clink = process.env.REACT_APP_LINK;

    useEffect(() => {
        if (localStorage.getItem('reload-facility') === '89307988vikasREF') {
            if (profile.profile.subarray.length > 0) {
                setSubs(profile.profile.subarray)
            }
        }
    }, [profile])

    return (
        <>
            <div className="courses">
                <div className="videopage-gap"></div>
                <h1>Active Courses</h1>
                {
                    subs.length === 0 ?
                        <h2>No course purchased yet</h2>
                        :
                        <ul>
                            {subs.find(({ name }) => name === "elev") ? <li> Jee guidance for 2024 batch <a onClick={() => {profile.setCurrent('elev'); navigate('/course') }}>Open</a></li> : ""}
                            {subs.find(({ name }) => name === "twel") ? <li>Jee guidance for 2023 batch <a onClick={() => {profile.setCurrent('twel'); navigate('/course') }}>Open</a> </li> : ""}
                            {subs.find(({ name }) => name === "combo") ? <li>Combo pack for both 2023 and 2024 students <a onClick={() => {profile.setCurrent('combo'); navigate('/course') }}>Open</a> </li> : ""}
                            {subs.find(({ name }) => name === "material") ? <li> Jee study material <a onClick={() => {profile.setCurrent('material'); navigate('/course') }}>Open</a></li> : ""}
                            {subs.find(({ name }) => name === "personal") ? <li> personal 1-1 guidance 6 moths validity <a onClick={() => { navigate('/guidance-personal') }}>Open</a></li> : ""}
                        </ul>
                }
                <div className="courses-btn">
                    {
                        subs.length === 0 ?
                            <button onClick={() => navigate('/price')}>Click to purchase courses</button>
                            :
                            <button onClick={() => navigate('/price')}>Click to purchase more courses</button>
                    }
                </div>
            </div>
        </>
    )
}

export default Courses