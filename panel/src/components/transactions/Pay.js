import axios from 'axios';
import React, {useEffect, useState} from 'react'
import './payment.css'

const Pay = (props) => {
    const {card, wali} = props;
    const link = process.env.REACT_APP_LINK;
    const [livestyle, setLivestyle] = useState({
        backgroundColor:'white'
    })
    useEffect(() => {
        axios.post(link + '/check/live',{id: card.userid}).then((response) => {
            if (response.data.status === 'online') {
                setLivestyle({
                    backgroundColor:'green'
                })
            }else{
                setLivestyle({
                    backgroundColor:'red'
                })
            }
        })
    },[])
    const walia = async () => {
        axios.post(link+'/benjo/paid',{id: card.userid, money: card.pendingamount}).then((response) =>{
            if(response.data.status === 'yes'){
                window.location.reload()
            }
        })
    }

  return (
    <div className="pay-cont">
        <div className="pay-id livstat"><h1 style={livestyle}></h1></div>
        <div className="pay-id"><h1>UPI ID</h1><h1>{card.upi}</h1></div>
        <div className="pay-id"><h1>Total amount</h1><h1>&#8377; {card.paymentrefrals.length*50}</h1></div>
        <div className="pay-id"><h1>Pending amount</h1><h1>&#8377; {card.pendingamount}</h1></div>
        <div className="pay-id"><h1>Paid amount</h1><h1>&#8377; {card.paidamount}</h1></div>
        <div className="pay-id"><h1>CP amount</h1><h1>&#8377; {card.prefs.length*50}</h1></div>
        <div className="pay-id"><h1>TR</h1><h1>{card.accountrefrals.length}</h1></div>
        <div className="pay-id"><h1>PR</h1><h1>{card.paymentrefrals.length}</h1></div>
        {
            wali === 'nobro' ?
            ''
            :
            <div onClick={() =>{walia()}} className="pay-id"><button>Pay</button></div>
        }
    </div>
  )
}

export default Pay