import React from 'react'
import './about.css'
import { Helmet } from "react-helmet"


const About = () => {



  return (
    <>
      <div className="about-main">
        <Helmet>
          <title>RankBoost - About us Page</title>
          <meta name="keywords" content="RankBoost about-us about us business model details" />
          <meta name="description" content="About us Page - RankBoost is an IIT-JEE guidance edTech platform and here we offer guidance courses and study material. we do not provide any service at offline mode, our mode of providing services are completely online. we do not offer any certificate on the completion of the courses." />
        </Helmet>
        <div className="videopage-gap"></div>
        <div className="about-cont">
          <div className="about-one">
            <h1>About us</h1>
          </div>
          <div className="about-two">
            <h1>RankBoost is an IIT-JEE guidance edTech platform and here we offer guidance courses and study material. we do not provide any service at offline mode, our mode of providing services are completely online. we do not offer any certificate on the completion of the courses. The founder of this platform are vikas and shubham. we both believe in providing quality content to our students and ensure that they get best service at affordable price. the major problem in clearing the iit-jee exams is lack of proper guidance and guidance which other companies offer is very expensive, we provide this guidance made by toppers and experts at very affordable price along with study material and 1-1 personal guidance.</h1>
          </div>
        </div>


      </div>
    </>
  )
}

export default About