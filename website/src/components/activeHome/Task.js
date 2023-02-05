import React, { useEffect, useState } from 'react'
import './comman.css'
import Part from '../course/Part'
import rackit from './rocket.png'
import axios from 'axios';
import ProfileContext from '../../context/profile/ProfileContext';
import { useNavigate } from 'react-router-dom';

function Task() {

    const [array, setArray] = useState([{ name: 'hello sir' }]);
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const clink = process.env.REACT_APP_LINK;
    const prowork = React.useContext(ProfileContext);
    const kart = prowork.profile.subarray;
    const navigate = useNavigate()
    const vlink = process.env.REACT_APP_VIDEO_LINK

    useEffect(() => {
        axios.get(`${clink}/weeklytask`).then((response) => {
            console.log(response.data);
            setArray(response.data.task);
            setFrom(response.data.from)
            setTo(response.data.to)
        })
    }, [])

    useEffect(() => {
        if (prowork.profile.void === 'no') {
            if (kart.find(({ name }) => name === "2023CC") || kart.find(({ name }) => name === "combo")) {
                /////////////
            } else {
                navigate('/')
            }
        } else {
            navigate('/')
        }
    }, [prowork])


    var n = 0;
    const [list, setList] = useState()
    const run = () => {
        setList(array.map(function (array) {
            n++
            return (
                <>
                    <h1>{n}) {array.name}</h1>
                </>
            )
        }))
    }
    useEffect(() => {
        run();
    }, [array])

    const openpdf = () => {
        window.open(`${vlink}/task1.pdf`, "_self")
        alert('Download has started')
    }

    return (
        <>
            <div className="videopage-gap"></div>
            <div className="task-main">
                <div className="task-one">
                    <div className="task-list">
                        <h1> Weekly Task <img style={{ width: '6rem', height: '6rem', marginLeft: '2rem' }} src={rackit} /></h1>
                    </div>
                    <h2>6 Feb 2023</h2>
                    <div className='taskbar'>
                        <h1>PDF of Weekly Task</h1>
                        <button onClick={() => openpdf()}>Download</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task
const video = () => {
    return (
        <>
            <h1 className='task-video-h1'>Watch this video today</h1>
            <Part />
        </>
    )
}