import React from 'react'
import './contact.css'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


const Contact = () => {

    const navigate = useNavigate();

    return (
        <div className="contact-cont">
            <Helmet>
                <title>RankBoost - Contact Us</title>
                <meta name="keywords" content="RankBoost contact us guidance mentorship iit jee" />
                <meta name="description" content="Reach us by contacting us over email, phone number or through our customer support of rankboost website which deals with guidance and mentorship for iit jee aspirants" />
            </Helmet>
            <div className="videopage-gap"></div>
            <div className="contact-main">
                <h1>Contact us</h1>
            </div>
            <div className="contact-second">
                <div className="contact-tab contact-tab1">
                    <p>if you want to talk to us related to any issue or want to raise any query related to the business you can contact us through our Email. Our company address is #5, lucky garden, dalip garh, ambala cantt, haryana</p>
                    <div><span style={{ color: 'var(--c2)' }}>EMAIL :- &nbsp;</span>
                        <a target="_blank" href="https://mail.google.com/">rankboosteducation@gmail.com</a><br/>
                        <a target="_blank" href="https://mail.google.com/">kumarshubham6089@gmail.com</a><br/>
                        <a target="_blank" href="https://mail.google.com/">vikasisgen@gmail.com</a><br/>
                    </div>
                    <div><span style={{ color: 'var(--c2)' }}>ADDRESS :- &nbsp;</span>
                        <a href="#">S O Kewal Krishan, Moonak, Sangrur, Punjab</a>
                    </div>
                    <div><span style={{ color: 'var(--c2)' }}>PHONE NUMBER :- &nbsp;</span>
                        <a href="#">7988500286</a>
                    </div>
                </div>
                <div className="contact-tab contact-tab2">
                    <p>if you want to raise any query related to your payment or any other service-based complaint you can go to our query section which can only be accessed by logged-in users.<br /> there you can raise your any doubt related to jee also. Click on the below button to go to the query section</p>
                    <button onClick={() => { navigate('/support') }}>query page</button>
                </div>
            </div>
        </div>)
}

export default Contact