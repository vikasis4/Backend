import React, {useState} from 'react'
import PaymentContext from './PaymentContext'
import {useContext} from 'react'
import ProfileContext from '../profile/ProfileContext'
import VerifyContext from '../verify/VerifyContext'
import axios from 'axios'


const PaymentState=(props)=>{


    const aaverify = useContext(VerifyContext);
    const aaprofile = useContext(ProfileContext);
    const clink = process.env.REACT_APP_LINK;


/////////////////////////////////////////////////////////////////////////////////// 4

    const activation = async (pkey)=> {
        if (aaprofile.profile.void === 'no') {
            await axios.put(clink+'/updatesubs', {id:aaprofile.profile.id, pkey})
            .then((response)=>{
                console.log(response.data);
                if (response.data.value === 'yes') {
                    alert("Your subscription has been activated, Reload your page to start with your course.");
                    window.location.reload();
                    aaprofile.setProfile({...aaprofile.profile, cart:[]})
                }else {
                    alert("Something went wrong, Do not worry just quickly go to query section and raise a query, we will quickly resolve this issue and will activate your subscription. sorry for the inconvenience")
                }
            })
        }else{
            activation()
        }
    }

///////////////////////////////////////////////////////////////////////// 3
    const  handlerazorpay=(maininfo) => {

        const id = aaprofile.profile.id;
        const type = aaprofile.profile.type;
        const cart = aaprofile.profile.cart;
        
        var options = {
            key: "rzp_test_AmFDUwfCiTTdEz", 
            amount: maininfo.amount, 
            currency: maininfo.currency,
            description:'Secure Payment with RazorPay',
            name: "JEE/NEET COUNCELLING",
            order_id: maininfo.id, 
            handler: async (response) => {
                try {
                    
                    const balue = {...response, id, type, cart}
                    const verifyurl = clink+'/payment/verify';
                    const {data} = await axios.post(verifyurl, balue);
                    if (data.status === 'success') {
                        activation(data.pkey);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: '#3399cc'
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open()
    }
    
///////////////////////////////////////////////////////////////////////////   1
    const paymentverify = (id) => {

        aaverify.Runverify('/');
        if (aaprofile.profile.void === "no") {
            handlepayment(id)
        }
    }
/////////////////////////////////////////////////////////////////////////////////// 2
    const handlepayment = async (id)=> {

        try {
            
            const orderurl = clink+'/payment/orders'
            const razorpaydata = await axios.post(orderurl, {id});
            handlerazorpay(razorpaydata.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    
        return (
        <PaymentContext.Provider value={{paymentverify}} >
           { props.children}
        </PaymentContext.Provider>
        )

}
     export default PaymentState;