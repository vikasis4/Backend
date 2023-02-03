import React, { useState } from 'react'
import './thirdsec.css'

const Thirdsection = () => {

  const [pop, setPop] = useState(0)
  const [hide, setHide] = useState([{ height: '0rem', padding: '0rem' }, { height: '0rem', padding: '0rem' }, { height: '0rem', padding: '0rem' }, { height: '0rem', padding: '0rem' },{ height: '0rem', padding: '0rem' }, { height: '0rem', padding: '0rem' }, { height: '0rem', padding: '0rem' }])
  const [rotate, setRotate] = useState([{ transform: 'rotate(0deg)' },{ transform: 'rotate(0deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(0deg)' }])
  const hidefxn = (index) => {
    if (hide[index].height === '0rem') {
      hide[index] = { height: 'max-content', padding: '2rem 1rem' };
      rotate[index] = { transform: 'rotate(180deg)' };
      setHide(hide)
      setRotate(rotate)
    } else {
      hide[index] = { height: '0rem', padding: '0rem' };
      rotate[index] = { transform: 'rotate(0deg)' };
      setHide(hide)
      setRotate(rotate)
    }

    setPop(Math.random() * 10)
  }


  return (
    <div className="Thirdsection-cont">

      <div className="Thirdsection-head">
        <h1>FeedBack</h1>
      </div>
      <div className="review">
        <div className="review-one">
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Ranjan kumar</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;&#9733;&#9733;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                One of the best platform for IITJEE. The IITIANS & Teachers
                are amazing, the amount of efforts they are putting is really
                commendable. As i have enrolled in combo course where i get
                personal mentorship from seniors & iitians teachers.
              </h1>
            </div>
          </div>
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Kunal singh</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                best guidance course for Jee mains & Advance.The recorded
                doubt videos are amazing. this course has covered almost
                every doubt that JEE aspirants face during their preparation.
              </h1>
            </div>
          </div>
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Deepansh sharma</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;&#9733;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                I am currently enrolled in the combo batch, preparing for jee
                2024.this batch inlcudes (JEE 2023 & 2024).i have seen
                improvement in my studies because odd the guidance i am
                getting from iitians. they are 24*7 ready to solve our doubts.
                This course is value for money.
              </h1>
            </div>
          </div>
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Shambhavi ahuja</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                i am very happy with this Guidance course.From the doubt videos
                to the study material, everything is superb. The handwritten
                Notes which is provided in this course are best, with the help
                of these short notes i am easily able to revise any chapter.This
                course is very helpful for jee aspirants.
              </h1>
            </div>
          </div>
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Vipin kulkarni</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;&#9733;&#9733;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                This course has covered almost all the doubts that i was facing
                before enrolling in this course.Rankboost teachers are very supportive
                they give proper guidance for jee mains as well as jee advance.
              </h1>
            </div>
          </div>
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Rajkumar bohra</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                Excellent teachers and iitians. Recorded videos of doubts, shortnotes,
                study material, pyq, mindmaps are very helpful. i have practiced almost
                20 mock tests with these previus year papers.
              </h1>
            </div>
          </div>
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Shilpi kumari</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;&#9733;&#9733;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                i am a jee 2024 aspirant. I study in kota in resonance.due to many
                backlogs in my studies i was not able to understand the concepts in
                coaching. But due rankboost course, i watched one video on how to
                cover backlogs i have covered almost half of my backlogs.Thanks to
                whole team.I am facing one issue, i am not able to download the study
                notes. please resolve this probelm asap
              </h1>
            </div>
          </div>
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Ritu puri</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                Thankyou to RankBoost team, especially shubham bhaiya
                I have enrolled in combo JEE batch last year. I was
                preparing for jee 2022 by self study but due to lack
                of guidance i was not able to prepare in proper structure.
                I enrolled in course iitians & teachers were just amazing
                they guided me for each subject,I followed all their advice
                Currently i am in NIT jalandhar EE branch. Thanks again
                Rankboost team
              </h1>
            </div>
          </div>
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Ianur alam</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;&#9733;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                this is the best platform for iitjee guidance & best platform
                for those students who can't afford very expensive coaching.
                it is providing all the best things for students like
                mentorship, short notes, tips & tricks, pyq, mock test at an
                affordable price. i am very happy and thankful to rankboost.
              </h1>
            </div>
          </div>
          <div className="review-cont">
            <div className="review-cont-two">
              <h1>Anil kumar</h1>
              <h2 data-texts="&nbsp;&#9733;&#9733;">&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;</h2>
            </div>
            <div className="review-cont-threw">
              <h1>
                I am facing technical isssue, i am not able to download the
                notes & study material. whenever i click on download pdf, it
                shows error. please fix this as soon as possible. Course is
                really good, especially doubt videos.
              </h1>
            </div>
          </div>

        </div>

      </div>

      <div className="Thirdsection-main">
        <div className="Thirdsec-heading">
          <h1>FAQ</h1>
        </div>
        <div className="Thirdsec-con">
          <div className="Thirdsec-ques">
            <h1 className="Thirdsec1"><span>Which is the best course for the jee ?</span> <span style={rotate[0]} onClick={() => { hidefxn(0) }}>&#8595;</span></h1>
            <p style={screen.width < 480 ? hide[0] : {}}>Combo pack is the best course for jee guidance as it contains the maximum value in very affordable cost</p>
          </div>
          <div className="Thirdsec-ques">
            <h1 className="Thirdsec2"><span>I can't able able to Access the course after making the payment</span> <span style={rotate[1]} onClick={() => { hidefxn(1) }}>&#8595;</span></h1>
            <p style={screen.width < 480 ? hide[1] : {}}>Either raise a query on customer support or Email us at rankboosteducation@gmail.com , we will reply you within 1 day</p>
          </div>
          <div className="Thirdsec-ques">
            <h1 className="Thirdsec3"><span>How many students have enrolled ? </span> <span style={rotate[2]} onClick={() => { hidefxn(2) }}>&#8595;</span></h1>
            <p style={screen.width < 480 ? hide[2] : {}}>More than 4000 students have enrolled and majority of them have enrolled in Combo pack</p>
          </div>
          <div className="Thirdsec-ques">
            <h1 className="Thirdsec4"><span>Can i download the study material</span> <span style={rotate[3]} onClick={() => { hidefxn(3) }}>&#8595;</span></h1>
            <p style={screen.width < 480 ? hide[3] : {}}>Yes you can download the study material </p>
          </div>
          <div className="Thirdsec-ques">
            <h1 className="Thirdsec5"><span>How can i contact rankboost team ?</span> <span style={rotate[4]} onClick={() => { hidefxn(4) }}>&#8595;</span></h1>
            <p style={screen.width < 480 ? hide[4] : {}}>Email us on any of the email id :- rankboosteducation@gmail.com<br/>  kumarshubham6089@gmail.com  <br/> vikasisgen@gmail.com</p>
          </div>
          <div className="Thirdsec-ques">
            <h1 className="Thirdsec5"><span>How to purchase the course ?</span> <span style={rotate[5]} onClick={() => { hidefxn(5) }}>&#8595;</span></h1>
            <p style={screen.width < 480 ? hide[5] : {}}>1) Create Your account<br/>2) Choose the course by adding them to the cart or directly buy them<br/>3) Make the payment (Warning : Do not close the page or browser while the payment is being processing)<br/>4) When you see the success message after payment, return to the website and reload the page</p>
          </div>
          <div className="Thirdsec-ques">
            <h1 className="Thirdsec5"><span>What this course contains ?</span> <span style={rotate[6]} onClick={() => { hidefxn(6) }}>&#8595;</span></h1>
            <p style={screen.width < 480 ? hide[6] : {}}>1) Roadmap for Jee Prepration<br/>2) Doubt session<br/>3) Mentorship <br/>4)Subject wise strategy<br/>5) 1-1 personal guidance</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thirdsection