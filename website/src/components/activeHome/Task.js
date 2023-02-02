import React, { useEffect, useState } from 'react'
import './comman.css'
import Part from '../course/Part'
import rackit from './rocket.png'
import axios from 'axios';

function Task() {

    const [array, setArray] = useState([{name:'hello sir'}]);
    const clink = process.env.REACT_APP_LINK;

    useEffect(() => {
      axios.get(`${clink}/weeklytask`).then((response) => {
        console.log(response.data);
        setArray(response.data)
      })
    }, [])
    

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



    return (
        <>
            <div className="videopage-gap"></div>
            <div className="task-main">
                <div className="task-one">
                    <div className="task-list">
                        <h1> Weekly Task <img style={{ width: '6rem', height: '6rem', marginLeft: '2rem' }} src={rackit} /></h1>
                    </div>
                    <div className='taskbar'>
                        {list}
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