import React from 'react'
import './about.css'
import { Helmet } from "react-helmet"
import fx1 from './fx1.jpg'
import fx2 from './fx2.jpg'


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
            <h2>RankBoost is an EdTech platform that aims to provide the best guidance for competitive exams like the IIT-JEE and NEET. RankBoost offers guidance courses, study materials, 1-1 mentorship, etc. We do not offer any certificates upon completion of the courses. In our courses, guidance is provided by IITIANS, experienced teachers, and seniors who have cracked the JEE and NEET exams. The major problem with clearing the competitive exams is a lack of proper mentoring and guidance. We are dedicated to helping students clear their IITJEE and NEET exams and get them into their dream engineering and medical colleges. RankBoost offers students proper, structured guidance for competitive exams. Our mode of service is completely online; we do not have any offline centers.
              The co-founders of this platform are Shubham and Vikas. Both have cracked JEE Mains and Advance and have mentored more than 7,500 students for IIT and NEET. We both believe in providing quality education and guidance to our students, ensuring that they get the best service at an affordable price.
            </h2>
            <h1>Founders</h1>
            <div className="about-images">
              <img src={fx1} alt="rankboost"></img>
              <img src={fx2} alt="rankboost"></img>
            </div>
            <h2>
              <b> Books</b><br />  We do not sell any books for competitive exams. We refer the best books to students for competitive exams through our affiliate links to Amazon. We get a commission from Amazon for every referral.<br /><br />
              <b>Earn money by referring others</b><br />  RankBoost offers a refer-and-earn program through which users can earn commissions on successful referrals of our courses. Each user will be assigned a unique referral link to refer or promote our courses. The affiliate program is in beta testing and may be discontinued at any point in the future. We can change the rules, commission rates, and maximum discounts applicable at any point. There is money or currency being transferred to your bank account once the customer buys our course through your referral link.<br /><br />
              <b>PDF Notes Handwritten </b><br /> We provide the best-handwritten notes and study material to our students at an affordable price. These notes are prepared by Kota's top teachers and IITIANS. These notes include theory, important pyq, diagrams, explanations of each concept, etc.<br /><br />
              <b>Rank-boost</b><br /> courses include Videos, study material, mentorship, a study plan, personal guidance, IITIANS support, IITJEE counselling, doubt sessions, the JEE Mains and Advanced Approach, and a chat section are all available.

            </h2>
          </div>
        </div>


      </div>
    </>
  )
}

export default About