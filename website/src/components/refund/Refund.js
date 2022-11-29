import React from 'react'
import './refund.css'
import { Helmet } from 'react-helmet'

const Refund = () => {
  return (
    <>
      <div className="refund-cont">
        <Helmet>
          <title>RankBoost - Refund policy</title>
          <meta name="keywords" content="RankBoost player guidance mentorship iit jee" />
          <meta name="description" content="Rankboost sells only digital products that is videos subscription and pdfs in form of online courses. If the customer once made the payment for any course then there is no refund scheme for that course." />
        </Helmet>
        <div className="videopage-gap"></div>

        <div className="privacy-main">
          <h1>cancellation / refund policy</h1>
        </div>
        <div className="refund-two">
          <p>Rankboost sells only digital products that is videos subscription and pdfs in form of online courses. If the customer once made the payment for any course then there is no refund scheme for that course. However, if a person face any technical issues, where he/she makes the payment and the subscription did not get activated then the person can contact us through our customer support, and we will verify the details of the payment and then will make subscription active for that account.<br />Rank boost does not offer any refund on the current course.</p>
        </div>
      </div>
    </>
  )
}

export default Refund