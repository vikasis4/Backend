import React, { useContext, useState, useEffect } from 'react'
import PaymentContext from '../../context/paymentportal/PaymentContext'
import ProfileContext from '../../context/profile/ProfileContext'
import { useNavigate } from 'react-router-dom'
import './checkout.css'
import pay from './6342757.jpg'
import minus from '../../svg/minus.svg'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const Checkout = () => {

    const Payment = useContext(PaymentContext);
    const profile = useContext(ProfileContext);
    const navigate = useNavigate();
    const clink = process.env.REACT_APP_LINK;
    const [kart, setKart] = useState(profile.profile.cart);
    const [bill, setBill] = useState(0);
    var num = 0;



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
            if (kart[i].name === 'elev') {
                num = num + 1299;
            }
            else if (kart[i].name === 'twel') {
                num = num + 699;
            }
            else if (kart[i].name === 'material') {
                num = num + 399;
            }
            else if (kart[i].name === 'personal') {
                num = num + 2999;
            }
            else if (kart[i].name === 'combo') {
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

        if (pirop === 'elev') {
            num = bill - 1299;
        }
        else if (pirop === 'twel') {
            num = bill - 699;
        }
        else if (pirop === 'material') {
            num = bill - 399;
        }
        else if (pirop === 'personal') {
            num = bill - 2999;
        }
        else if (pirop === 'combo') {
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
    const initiate = () => {
        setBtn(true)
        setTimeout(() => {
            if (profile.profile.void === 'no') {
                if (bill > 0) {
                    Payment.paymentverify(profile.profile.id)
                } else {
                    alert("Cart is empty")
                }
            } else {
                alert('Quickly create an account to start your journey')
                navigate('/register')
            }
        },2500)
    }

    return (
        <>
            <div className="videopage-gap"></div>
            <div className="checkout-main">
                <Helmet>
                    <title>RankBoost - Checkout Cart</title>
                </Helmet>
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
                                {kart.find(({ name }) => name === "elev") ? <li><a onClick={() => { jani("elev") }}><img src={minus}></img></a> Jee guidance for 2024 batch, price &#8377; 1299 </li> : ""}
                                {kart.find(({ name }) => name === "twel") ? <li><a onClick={() => { jani("twel") }}><img src={minus}></img></a> Jee guidance for 2023 batch, price &#8377; 699 </li> : ""}
                                {kart.find(({ name }) => name === "combo") ? <li><a onClick={() => { jani("combo") }}><img src={minus}></img></a> Combo pack for both 2023 and 2024 students, price &#8377; 999 </li> : ""}
                                {kart.find(({ name }) => name === "material") ? <li><a onClick={() => { jani("material") }}><img src={minus}></img></a> Jee study material, price &#8377; 399 </li> : ""}
                                {kart.find(({ name }) => name === "personal") ? <li><a onClick={() => { jani("personal") }}><img src={minus}></img></a> personal 1-1 guidance 6 moths validity, price &#8377; 2999 </li> : ""}
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