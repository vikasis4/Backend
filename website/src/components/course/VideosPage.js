import React, { useContext, useState, useEffect } from 'react'
import './videopage.css'
import ProfileContext from '../../context/profile/ProfileContext'
import { useNavigate } from 'react-router-dom'
import Footer from '../footer/Footer'
import Material from './Material'
import { Helmet } from 'react-helmet'
import profile from '../../svg/profile.svg'

const VideosPage = () => {


  const navigate = useNavigate();

  const wow = useContext(ProfileContext)
  const [bar, setBar] = useState('yes');
  const [status, setStatus] = useState([]);


  var root = document.querySelector(':root');
  const toggleR = () => {
    if (bar === 'yes') {
      root.style.setProperty('--borderTop1', 'var(--c2)');
      root.style.setProperty('--borderTop2', 'var(--s3)');
      document.getElementById('mat-one').style.transform = 'translateY(-10px)';
      document.getElementById('mat-two').style.transform = 'translateY(0px)';
      setBar('no')
    }
    else {
      root.style.setProperty('--borderTop1', 'var(--s3)');
      root.style.setProperty('--borderTop2', 'var(--c2)');
      document.getElementById('mat-one').style.transform = 'translateY(0px)';
      document.getElementById('mat-two').style.transform = 'translateY(-10px)';
      setBar('yes')

    }
  }
  useEffect(() => {
    if (localStorage.getItem('reload-facility') === '89307988vikasREF') {
      if (wow.profile.subscription === 'true') {
        { wow.current === "elev" ? setStatus('Jee Guidance for 2024 batch') : '' }
        { wow.current === "twel" ? setStatus('Jee Guidance for 2023 batch') : '' }
        { wow.current === "combo" ? setStatus('Jee Guidance 2023 & 2024 batch') : '' }
        { wow.current === "material" ? setStatus('Jee study material') : '' }
        if (wow.current === "material") {
          setBar('no')
        }
        if (wow.current === "") {
          if (screen.width < 480) {
            navigate('/courses')
          } else {
            navigate('/price')
          }
        }
      }
      else if (wow.profile.subscription === 'false') {
        navigate('/price')
      }
    }
    else {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [wow])
  ///////////////////////////////////////////////////////////////////////////////////


  return (
    <>
      <div className="videopage-gap"></div>
      <div className="videopage-main">
        <Helmet>
          <title>RankBoost - Guidance Course</title>
          <meta name="keywords" content="RankBoost course guidance mentorship iit jee" />
          <meta name="description" content="RankBoost Course" />
        </Helmet>
        <div className="videopage-main-cont">
          <div className="videopage-bg">
            <div className="videopage-info">
              <h1>{status}</h1>
            </div>
            {
              wow.current === "combo" ?
                <div className="videopage-material">
                  <div onClick={() => toggleR()} id="mat-two" className="videopage-mat-one ploki">
                    <div className="mat-text"><h1>Guidance videos</h1></div>
                  </div>
                  <div onClick={() => toggleR()} id="mat-one" className="videopage-mat-one ploko">
                    <div className="mat-text"><h1>Study material</h1></div>
                  </div>
                </div>
                : ''
            }
            {
              wow.current === 'combo' || wow.current === 'elev' || wow.current === 'twel' ?
                bar === 'yes' ?
                  <div className="last-watched">
                    <h1>Your last watched video was :</h1>
                    <h2>{wow.profile.current.name === '' ? "None" : wow.profile.current.name}</h2>
                  </div>
                  : ''
                : ''
            }
          </div>
          {bar === 'no' ?
            <Material footer={<Footer />} />
            :
            <>
              <div className="priv-access">
                <img onClick={wow.profile.subscription === 'true' ? ()=> navigate('/player') : ()=>{}} src={profile}></img>
                <h1>Open The Videos</h1>
              </div>
              <div className="videopage-gap"></div>
              <Footer />
            </>
          }
        </div>
      </div>
    </>
  )
}

export default VideosPage