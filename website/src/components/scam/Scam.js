import React from 'react'
import './scam.css'
function Scam() {
  return (
    <>
            <div className="videopage-gap"></div>
            <div className="scam">
                <h1>Meet The Founder</h1>
                <img className="scam-img" src={require('./bro.jpg')} />
                <h2>Shubham Kumar</h2>
                <h3>Our Office Space</h3>
                <img className="scam-imgs" src={require('./office.jpg')} />
                <img className="scam-imgs" src={require('./office2.jpg')} />
                <img className="scam-imgs" src={require('./office3.jpg')} />
                <img className="scam-imgs" src={require('./office4.jpg')} />
            </div>
    </>
  )
}

export default Scam