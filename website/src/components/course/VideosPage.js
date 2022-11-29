import React, { useContext, useState, useEffect } from 'react'
import './videopage.css'
import Card from './Card.js'
import axios from 'axios'
import CourseContext from '../../context/course/CourseContext'
import ProfileContext from '../../context/profile/ProfileContext'
import VerifyContext from '../../context/verify/VerifyContext'
import { useNavigate } from 'react-router-dom'
import Footer from '../footer/Footer'
import Material from './Material'
import { Helmet } from 'react-helmet'

const VideosPage = () => {


  const navigate = useNavigate();

  const jango = useContext(CourseContext)
  const wow = useContext(ProfileContext)
  const amaze = useContext(VerifyContext)
  const [bar, setBar] = useState('yes');
  const clink = process.env.REACT_APP_LINK;
  const [status, setStatus] = useState([]);

  var istyle = {
    display: 'block'
  }
  if (jango.course.length > 0) {
    istyle = { display: 'none' }
  }

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

        { wow.current === "elev" ? setStatus('Jee guidance 2024 batch') : '' }
        { wow.current === "twel" ? setStatus('Jee guidance 2023 batch') : '' }
        { wow.current === "combo" ? setStatus('Jee guidance for both 2023 and 2024 students') : '' }
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

        amaze.setProgress(50)
        fetchData();
        async function fetchData() {
          await axios.get(clink + '/course')
            .then(async (response) => {
              amaze.setProgress(50)
              jango.setCourse(response.data)
            })
          setTimeout(() => {
            amaze.setProgress(100)
          }, 500)
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


  var one = '';
  var two = '';
  var dyta = '';

  if (jango.course) {

    dyta = jango.course;
    one = (dyta).map(
      (dyta) => {
        if (dyta.category === 't1') {
          return <Card key={dyta._id} card={dyta} />
        }
      }
    )
    two = (dyta).map(
      (dyta) => {
        if (dyta.category === 't2') {
          return <Card key={dyta._id} card={dyta} />
        }
      }
    )
  }
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
              <h1>Welcome to {status}</h1>
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
            <div className="videopage-second">
              <div className="videopage-sec">
                <div className="videopage-head">
                  <h2>Section 1 :- Psychology</h2>
                </div>
                <div className="videopage-sec-enter">
                  <div style={istyle} className="loader-load"><div className="load-mid"></div></div>
                  <div style={istyle} className="loader-load"><div className="load-mid"></div></div>
                  <div style={istyle} className="loader-load"><div className="load-mid"></div></div>
                  {one}
                </div>
              </div>

              <div className="videopage-sec1">
                <div className="videopage-head">
                  <h2>Section 2 :- Study tips and tricks</h2>
                </div>
                <div className="videopage-sec-enter">
                  <div style={istyle} className="loader-load"><div className="load-mid"></div></div>
                  <div style={istyle} className="loader-load"><div className="load-mid"></div></div>
                  <div style={istyle} className="loader-load"><div className="load-mid"></div></div>
                  {two}
                </div>

                <div className="videopage-gap"></div>
                <Footer />
              </div>
            </div>
          }




        </div>
      </div>

    </>
  )
}

export default VideosPage