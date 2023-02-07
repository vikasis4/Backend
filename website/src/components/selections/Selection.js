import React from 'react'
import img from '../homePageLO/djx.png'
import './selection.css'

function Selection() {
    return (
        <>
            <div className="videopage-gap"></div>
            <div className="selection">
                <img src={img}></img>
            </div>
            <div className="selection-quote">
                <h1>India's best <br />Mentorship Platform</h1>
                <div className="selection-text">
                    <h2>12 K+<br />Happy Students</h2>
                    <h2>100+<br />Guidance videos</h2>
                </div>
                <div className="selection-text">
                    <h2>IIT/NIT<br />Personal Mentors</h2>
                    <h2>Daily Task &<br />Personalised Routine</h2>
                </div>
            </div>
        </>
    )
}

export default Selection