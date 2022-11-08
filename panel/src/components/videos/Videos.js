import React, { useState } from 'react'
import axios from 'axios'
import './videos.css'



const Videos = () => {

    const [namev, setNamev] = useState()
    const [bnamev, setBnamev] = useState()
    const [typev, setTypev] = useState()
    const [minutesv, setMinutesv] = useState()
    const [secondsv, setSecondsv] = useState()
    const [resposnev, setResponsev] = useState()
    
    const [namep, setNamep] = useState()
    const [bnamep, setBnamep] = useState()
    const [typep, setTypep] = useState()
    const [resposnep, setResponsep] = useState()
    const link = process.env.REACT_APP_LINK

    const videosubmit = () =>{
        axios.post(link+"/video/upload",{
            name:namev,
            bname:bnamev,
            category:typev,
            minutes:minutesv,
            seconds:secondsv,
        }).then(response =>{setResponsev(response.data)})
    }
    const pdfsubmit = (e) =>{
        axios.post(link+"/upload/pdf",{
            name:namep,
            bname:bnamep,
            type:typep
        }).then(response =>{setResponsep(response.data)})
    }
    
    const pyqsubmit = (e) =>{
        axios.post(link+"/pyq/create",{
            name:namep,
            bname:bnamep,
            type:typep
        })
    }

    return (
        <>
        <div style={{height: '5rem'}}></div>
        <div className="video-cont">
            <h1>Add Pyq</h1>
           <form className="video-form">
            <input type="text" value={namep} onChange={(e) => {setNamep(e.target.value)}} placeholder="enter name"></input>
            <input type="text" value={bnamep} onChange={(e) => {setBnamep(e.target.value)}} placeholder="enter bname"></input>
            <input type="text" value={typep} onChange={(e) => {setTypep(e.target.value)}} placeholder="enter type"></input>
            <button onClick={() =>{pyqsubmit()}}className="video-submit">SUBMIT</button>
           </form>
           </div>
        <div style={{height: '5rem'}}></div>
        <div className="video-cont">
            <h1>Add PDF</h1>
           <form className="video-form">
            <input type="text" value={namep} onChange={(e) => {setNamep(e.target.value)}} placeholder="enter name"></input>
            <input type="text" value={bnamep} onChange={(e) => {setBnamep(e.target.value)}} placeholder="enter bname"></input>
            <input type="text" value={typep} onChange={(e) => {setTypep(e.target.value)}} placeholder="enter type"></input>
            <button onClick={() =>{pdfsubmit()}}className="video-submit">SUBMIT</button>
           </form>
           </div>
        <div style={{height: '5rem'}}></div>
        <div className="video-cont">
            <h1>Add video</h1>
           <form className="video-form">
            <input type="text" value={namev} onChange={(e) => {setNamev(e.target.value)}} placeholder="enter name"></input>
            <input type="text" value={bnamev} onChange={(e) => {setBnamev(e.target.value)}} placeholder="enter bname"></input>
            <input type="text" value={typev} onChange={(e) => {setTypev(e.target.value)}} placeholder="enter type"></input>
            <input type="number" value={minutesv} onChange={(e) => {setMinutesv(e.target.value)}} placeholder="enter minutes"></input>
            <input type="number" value={secondsv} onChange={(e) => {setSecondsv(e.target.value)}} placeholder="enter seconds"></input>
            <button onClick={() =>{videosubmit()}} className="video-submit">SUBMIT</button>
            <h1>{resposnev}</h1>
           </form>
           </div>
        <div style={{height: '5rem'}}></div>
        </>
    )
}

export default Videos