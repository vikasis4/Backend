import React, { useContext, useState, useEffect } from 'react'
import PaymentContext from '../../context/paymentportal/PaymentContext'
import ProfileContext from '../../context/profile/ProfileContext'
import { useNavigate } from 'react-router-dom'
import './checkout.css'
import pay from './6342757.jpg'
import minus from '../../svg/minus.svg'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import jwt_decode from 'jwt-decode'


const Checkout = () => {

    const Payment = useContext(PaymentContext);
    const profile = useContext(ProfileContext);
    const navigate = useNavigate();
    const clink = process.env.REACT_APP_LINK;
    const [kart, setKart] = useState(profile.profile.cart);
    const [bill, setBill] = useState(0);
    var num = 0;
    const [refral, setRefral] = useState(localStorage.getItem('refral'))


    useEffect(() => {
        if (localStorage.getItem('reload-facility') === '89307988vikasREF') {
            if (profile.profile.void === 'no') {
                setKart(profile.profile.cart)
            }
        }

        // eslint-disable-next-line
    }, [profile])



    useEffect(() => {
        for (let i = 0; i < kart.length; i++) {
            if (kart[i].name === 'material') {
                num = num + 499;
            }
            else if (kart[i].name === '2023CC') {
                num = num + 999;
            }
            if (i === kart.length - 1) {
                setBill(num);
            }
        }
    }, [kart])

    const jani = (pirop) => {
        const val = kart.findIndex(x => x.name === pirop);
        kart.splice(val, 1);
        setKart(kart);
        profile.setProfile({ ...profile.profile, cart: kart });


        if (pirop === 'material') {
            num = bill - 499;
        }

        else if (pirop === '2023CC') {
            num = bill - 999;
        }

        setBill(num);
        if (profile.profile.void === 'no') {
            axios.post(`${clink}/cartremove`, {
                id: profile.profile.id,
                cart: kart
            }).then(function (response) { if (response.data.status === 'no') { alert('Something went wrong please try again') } })
        } else {
            localStorage.removeItem(cart);
            localStorage.setItem('cart', kart)
        }
    }
    const [btn, setBtn] = useState(false)
    const [vista, setVista] = useState(false)

    const initiate = () => {
        if (bill > 0) {
            if (profile.profile.void === 'no') {
                setBtn(true)
                setTimeout(() => {
                    Payment.paymentverify(profile.profile.id)
                }, 2500)
            } else {
                setVista(true)
            }
        } else {
            alert("Cart is empty")
        }
    }

    /////////////////////// initiate google ////////////////////////////
    const googlesignup = (response) => {
        var userobj = jwt_decode(response.credential);
        if (userobj.email_verified) {
            var pass = userobj.jti.slice(0, 10);
            const googlestart = async () => {
                await axios.post(clink + '/register', {
                    username: userobj.email,
                    password: pass,
                    type: 'google',
                    name: userobj.given_name,
                    img: userobj.picture,
                    refral: refral,
                    namee: userobj.given_name
                })
                    .then((response) => {
                        if (response.data.message === 'yup') {
                            localStorage.setItem('token', response.data.token)
                            if (localStorage.getItem('refral')) {
                                localStorage.removeItem('refral')
                            }
                            Payment.noUserPay(response.data.newUser, kart);
                            setVista(false)
                        }
                        else if (response.data.message === 'no') {
                            profile.setDisp('none')
                            alert('email is already registered')
                        }
                    })
            }
            googlestart();
        }
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "535610579205-d0dad7t8r0orbhtgb842l84bib80gg95.apps.googleusercontent.com",
            callback: googlesignup
        });
        google.accounts.id.renderButton(
            document.getElementById("PayJs"),
            { theme: "outline", size: "large" }
        )
    }, [])


    return (
        <>
            <div className="videopage-gap"></div>
            <div className="checkout-main">
                <Helmet>
                    <title>RankBoost - Checkout Cart</title>
                </Helmet>
                <div className="pay-acc" style={vista === false ? { display: "none" } : { display: "block" }}>
                    <div className="pay-accs">
                        <h1>Create Account and continue to pay</h1>
                        <div id="PayJs"></div>
                    </div>
                </div>
                <div className="checkout-second">
                    <img src={pay}></img>
                </div>
                <div className="checkout-first">
                    <div className="checkout-first-second">
                        {!btn === false ? <div className="check-warn"> <h1>Warning !!!!</h1><h2>Do not close the Tab or the Browser while the payment is processing</h2></div> :
                            <>
                                <div className="checkout-liss">
                                    <h1>Total items :-</h1>
                                    {kart.length === 0 ? <h1 style={{ fontSize: '1.8rem', fontWeight: '600', color: 'purple', textAlign: 'center', margin: '4rem 0' }}>Cart is empty</h1> : ""}
                                    <ul>
                                        {kart.find(({ name }) => name === "2023CC") ? <li><a onClick={() => { jani("combo") }}><img src={minus}></img></a> Jee Mains and Advance 2023 Mentorship, Price &#8377; 999 </li> : ""}
                                        {kart.find(({ name }) => name === "material") ? <li><a onClick={() => { jani("material") }}><img src={minus}></img></a> Jee study material, price &#8377; 499 </li> : ""}
                                    </ul>
                                </div>
                            </>}
                        <h1 className="checkout-cart-txt">Cart subtotal</h1>
                        <h2>Total amount you have to pay for your cart : &#8377; {bill}</h2>
                        <button onClick={() => { initiate() }}>{btn === false ? 'Pay' : "Please wait..."}</button>
                    </div>
                    <div className="checkout-modes">
                        <h1>Available payment modes</h1>
                        <div className="checkout-mode">
                            <h1>UPI</h1>
                            <h1>CARD</h1>
                            <h1>WALLET</h1>
                            <h1>NETBANKING</h1>
                            <h1>PAYLATER</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="videopage-gap"></div>

        </>
    )
}

export default Checkout