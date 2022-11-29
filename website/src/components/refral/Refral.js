import React, { useState, useEffect, useContext } from 'react'
import ProfileContext from '../../context/profile/ProfileContext'
import axios from 'axios'
import './refral.css'
import { Helmet } from 'react-helmet'

const Refral = () => {

    const [money, setMoney] = useState(0)
    const [wmoney, setWmoney] = useState(0)
    const [pmoney, setPmoney] = useState(0)
    const [accarray, setAccarray] = useState([])
    const [payarray, setPayarray] = useState([])
    const [upi, setUpi] = useState('')
    const [link, setLink] = useState('empty')
    const clink = process.env.REACT_APP_LINK;
    const profile = useContext(ProfileContext)
    const [text, setText] = useState(`Copy to clipboard`)

    useEffect(() => {
        if (localStorage.getItem('reload-facility') === '89307988vikasREF') {
            if (profile.profile.void === 'no') {
                axios.post(clink + '/refral/data', { id: profile.profile.id }).then((response) => {
                    if (response.data.status === 'yes') {
                        setWmoney(response.data.refral.paidamount)
                        setPmoney(response.data.refral.pendingamount)
                        var amount = response.data.refral.paymentrefrals.length * 50;
                        setMoney(amount)
                        setAccarray(response.data.refral.accountrefrals)
                        setPayarray(response.data.refral.paymentrefrals)
                        setLink(response.data.refral.userid)
                        setUpi(response.data.refral.upi)
                    } else {
                        ////////////
                    }
                })
            }
        }
    }, [profile])
    const generate = () => {
        if (profile.profile.void === 'no') {
            if (upi === '') {
                alert('Please enter your UPI ID to receive payments quickly in future')
            } else {
                axios.post(clink + '/refral/post', { id: profile.profile.id, upi }).then(response => {
                    if (response.data.status === 'success') {
                        alert('Generated successfully');
                        window.location.reload();
                    } else {
                        alert('Something went wrong, please try again')
                    }
                })
            }
        } else {
            alert("Please create account to start with refral scheme")
        }
    }
    const changeupi = () => {
        if (profile.profile.void === 'no') {
            if (upi === '') {
                alert("Please enter valid UPI ID")
            } else {
                axios.post(clink + '/refral/update', {
                    id: profile.profile.id,
                    upi
                }).then((response) => {
                    if (response.data.status === 'yes') {
                        alert("Updated successfully")
                    }
                })
            }
        } else {
            alert('Please create account to start')
        }
    }
    var copyitem = `http://localhost:3000/refral-link/${link}`
    const copy = () => {
        navigator.clipboard.writeText(copyitem);
        setText("-----copied-----")
        setTimeout(() => {
            setText("Copy to clipboard")
        }, 1500)
    }
    /////////////////////////////////////////////////////////////////////

    const withdraw = () => {
        if (money - wmoney - pmoney === 0) {
            alert("You don't have enough balance to withdraw'")
        } else {
            axios.post(clink + '/withdraw/refral/money', { id: profile.profile.id }).then(function (response) {
                if (response.data.status === 'success') {
                    alert("Withdrawn process has been successfully started, it will take 2 days for settling down transaction")
                }
            })
        }
    }

    return (
        <>
            <div className="videopage-gap"></div>
            <div className="refral-main">
                <Helmet>
                    <title>RankBoost - Referral Scheme</title>
                    <meta name="keywords" content="RankBoost referral refer guidance mentorship iit jee" />
                    <meta name="description" content="Rankboost Referral scheme offers you 50 rs per transaction made by the person you refer to. Generate your referal link and share it with your friends. visit the page to view more details" />
                </Helmet>
                <div className="refral-one">
                    <h1>&#8377; 50 &nbsp; per referral</h1>
                </div>
                <div className="refral-two">
                    <div className="refral-two-one">
                        <h1>Balance</h1>
                        <h1>&#8377; {money - wmoney - pmoney}</h1>
                    </div>
                    <div className="refral-two-one">
                        <h1>Total Money earned</h1>
                        <h1>&#8377; {money}</h1>
                    </div>
                    <div className="refral-two-two">
                        <h1>Money withdrawn</h1>
                        <h1>&#8377; {wmoney}</h1>
                    </div>
                    <div className="refral-two-two">
                        <h1>Money pending</h1>
                        <h1>&#8377; {pmoney}</h1>
                    </div>
                </div>
                <div className="refral-three">
                    <div className="refral-special">
                        <div className="refral-three-one">
                            <h1>Your referral link :- <span style={{ fontSize: '3.2rem' }}>{screen.width < 540 ? <br /> : ''}{link === 'empty' ? 'None' : `http://localhost:3000/refral-link/${link}`}</span>{screen.width < 540 ? <br /> : ''}<span onClick={() => { copy() }} className="refral-copy">{text}</span></h1>
                            <div className="refral-upi">
                                <span>{link === 'empty' ? 'Enter' : 'Change'} UPI ID</span>
                                <input type="text" value={upi} onChange={(e) => { setUpi(e.target.value) }}></input>
                            </div>
                            {
                                link === 'empty' ?
                                    <button onClick={() => { generate() }}>Generate Link</button>
                                    :
                                    <button onClick={() => { changeupi() }}>Change UPI id</button>
                            }
                        </div>
                        <div className="refral-three-bone">
                            <h1>Click here to withdraw your all money</h1>
                            <button onClick={() => { withdraw() }}>Withdraw money</button>
                        </div>
                    </div>
                    <div className="refral-special-two">
                        <div className="refral-special-t-t">
                            <h1>Total number of accounts created with your referrals :- {accarray.length}</h1>
                        </div>
                        <div className="refral-special-t-t">
                            <h1>Total number of accounts Subscribed the course :- {payarray.length}</h1>
                        </div>
                    </div>
                </div>
                <div className="refral-four">
                    <h1>Referral policy</h1>
                    <h2>* To start with referral scheme, you first have to generate your referal link, for that you have to enter your upi id and click on generate link </h2>
                    <h2>* UPI ID is required to transfer the money you earned into your account</h2>
                    <h2>* For every referral, you will get 50 rs only when they will purchase a subscription</h2>
                    <h2>* After withdrawal, it will take 1-2 days to settle down your transaction</h2>
                </div>
            </div>

            <div className="videopage-gap"></div>
        </>
    )
}

export default Refral