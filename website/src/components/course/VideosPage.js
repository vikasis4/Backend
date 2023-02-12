import React, { useContext, useState, useEffect } from 'react'
import './videopage.css'
import ProfileContext from '../../context/profile/ProfileContext'
import { useNavigate } from 'react-router-dom'
import Footer from '../footer/Footer'
import Material from './Material'
import { Helmet } from 'react-helmet'

const VideosPage = () => {


  const navigate = useNavigate();

  const wow = useContext(ProfileContext)

  useEffect(() => {
    if (localStorage.getItem('reload-facility') === '89307988vikasREF') {
      if (wow.profile.subscription === 'false') {
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



        <Material footer={<Footer />} />
      </div>
    </>
  )
}

export default VideosPage