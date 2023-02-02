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
                            {subs.find(({ name }) => name === "combo") || subs.find(({ name }) => name === "2023CC") ? <li>JEE 2023 Mains + Advance <a onClick={() => {profile.setCurrent('combo'); navigate('/course') }}>Open</a> </li> : ""}
                            {subs.find(({ name }) => name === "material") ? <li> Jee study material <a onClick={() => {profile.setCurrent('material'); navigate('/course') }}>Open</a></li> : ""}
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