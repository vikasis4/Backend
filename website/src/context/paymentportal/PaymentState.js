import React, { useState } from 'react'
import PaymentContext from './PaymentContext'
import { useContext } from 'react'
import ProfileContext from '../profile/ProfileContext'
import VerifyContext from '../verify/VerifyContext'
import axios from 'axios'
<script id="bolt" src="https://sboxcheckout-static.citruspay.com/bolt/run/bolt.min.js" bolt-
    color="red" bolt-logo="%PUBLIC_URL%/favicon.ico"></script>

const PaymentState = (props) => {
    const aaverify = useContext(VerifyContext);
    const aaprofile = useContext(ProfileContext);
    const clink = process.env.REACT_APP_LINK;
    const [xd, setXd] = useState('');
    const email = aaprofile.profile.username
    ///////////////////////////////////////////////////////////////////////////   1
    const paymentverify = (id) => {
        aaverify.Runverify('/');
        if (aaprofile.profile.void === "no") {
            handlepayment(id, 'normal', '',[])
        }
    }
    const noUserPay = (obj,cart) => {      
        handlepayment(obj._id, 'pay', obj.username, cart)
    }
    ////////////////////////////////// START PAYMENT ///////////////////////////////////////////////// 2

    const handlepayment = async (id, md, mail, cart) => {
        try {
            if (md === 'pay') {
                var pd = {
                    key: process.env.MERCHANT_KEY,
                    txnid: 'new_account',
                    amount: 1,
                    firstname: 'RankBoost',
                    email: mail,
                    phone: 1234321863,
                    productinfo: 'RankBoost courses',
                    surl: 'https://rankboost.live',
                    furl: 'https://rankboost.live',
                    hash: '',
                }     
            }else{
                var pd = {
                    key: process.env.MERCHANT_KEY,
                    txnid: 'unique_id',
                    amount: 1,
                    firstname: 'RankBoost',
                    email,
                    phone: 1234321863,
                    productinfo: 'RankBoost courses',
                    surl: 'https://rankboost.live',
                    furl: 'https://rankboost.live',
                    hash: '',
                }
            }

            // Data to be Sent to API to generate hash.
            let data = {
                'txnid': pd.txnid,
                'email': pd.email,
                'amount': pd.amount,
                'productinfo': pd.productinfo,
                'firstname': pd.firstname,
                'udf1': id,
                'udf2': cart,
                'udf3': '',
            }
            let self = this;
            // API call to get the Hash value
            axios.post(clink + '/payments/payumoney', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data
            })
                .then(function (a) {
                    if (a.data.status === 'link') {
                        window.open(a.data.link, "_self");
                    } else if (a.data.status === 'body') {
                        setXd(a.data.body);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <PaymentContext.Provider value={{ paymentverify, noUserPay }} >
                {props.children}
            </PaymentContext.Provider>
        </>
    )

}
export default PaymentState;