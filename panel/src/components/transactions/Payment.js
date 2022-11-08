import React, { useState, useEffect } from 'react'
import './payment.css'
import axios from 'axios'
import Pay from './Pay'

const Payment = () => {

    const [numberone, setNumberone] = useState([
        {
            name:'elev',
            amount:0
        },
        {
            name:'twel',
            amount:0
        },
        {
            name:'combo',
            amount:0
        },
        {
            name:'personal',
            amount:0
        },
        {
            name:'material',
            amount:0
        },
    ])
    const [pendingamountarray, setPendingamountarray] = useState([])
    const [dataarr, setDataarr] = useState([])
    const [refarray_length, setRefarray_length] = useState(0)
    const clink = process.env.REACT_APP_LINK
    const [refarray, setRefarray] = useState([])
    const [preamount, setPreamount] = useState(0)
    const [paidamount, setPaidamount] = useState(0)
    const [totalamount, setTotalamount] = useState(0)
    const [payarr, setPayarr] = useState([])
    const [paidarr, setPaidarr] = useState([])

    useEffect(() => {
        axios.get(clink + '/fetch/transactions').then((response) => {
            setDataarr(response.data);
        })
    }, [])
    /////////////////////////
    useEffect(() => {
        for (let i = 0; i < dataarr.length; i++) {
            for (let j = 0; j < dataarr[i].cart.length; j++) {
                if (dataarr[i].cart[j].name === 'elev'){
                    numberone[0].amount = numberone[0].amount + 1;
                }
                else if (dataarr[i].cart[j].name === 'twel'){
                    numberone[1].amount = numberone[1].amount + 1;
                }
                else if (dataarr[i].cart[j].name === 'combo'){
                    numberone[2].amount = numberone[2].amount + 1;
                }
                else if (dataarr[i].cart[j].name === 'personal'){
                    numberone[3].amount = numberone[3].amount + 1;
                }
                else if (dataarr[i].cart[j].name === 'material'){
                    numberone[4].amount = numberone[4].amount + 1;
                }
            }
            if (i === dataarr.length - 1) {
                setNumberone(numberone);
            }
        }
    },[dataarr])
    /////////////////////////////
    useEffect(() => {
        for (let i = 0; i < dataarr.length; i++) {
            if (dataarr[i].type === 'refral') {
                refarray.push(dataarr[i])
                setRefarray([...refarray])
            }
        }
    },[dataarr])
    useEffect(() => {
        setRefarray_length(refarray.length)
    },[refarray])



    useEffect(() => {
        axios.get(clink + '/fetch/refrals').then((response) => {
            setPendingamountarray(response.data)
        })
    }, [])
    useEffect(() => {
        for (let i = 0; i < pendingamountarray.length; i++) {
            setPreamount(preamount + pendingamountarray[i].pendingamount)
        }
    },[pendingamountarray])
    useEffect(() => {
        for (let i = 0; i < pendingamountarray.length; i++){
            setTotalamount(totalamount + pendingamountarray[i].paymentrefrals.length*50)
        }
    },[pendingamountarray])
    useEffect(() => {
        for (let i = 0; i < pendingamountarray.length; i++) {
            setPaidamount(paidamount + pendingamountarray[i].paidamount)
        }
    },[pendingamountarray])
    useEffect(() => {
        for (let i = 0; i < pendingamountarray.length; i++) {
            if (pendingamountarray[i].status === 'on'){
                payarr.push(pendingamountarray[i])
                setPayarr([...payarr])
            }
        }
    },[pendingamountarray])
    useEffect(() => {
        for (let i = 0; i < pendingamountarray.length; i++) {
            if (pendingamountarray[i].paystat === 'yes'){
                paidarr.push(pendingamountarray[i])
                setPaidarr([...paidarr])
            }
        }
    },[pendingamountarray])
    //////////////////////////////////////////////////////////////////////////////////////////
    var payslip;
    if (pendingamountarray.length > 0) {
        payslip = (payarr).map(
            (payarr) => {
          return <Pay key={payarr._id} card={payarr} wali={"bro"}/>
        }
      )
    }
    var paidslip;
    if (pendingamountarray.length > 0) {
        paidslip = (paidarr).map(
            (paidarr) => {
          return <Pay key={paidarr._id} card={paidarr} wali={"nobro"} />
        }
      )
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
    const [sts, setSts] = useState('dues')
    const changests = () =>{
        if (sts === 'dues') {
            setSts('paid')
        }else{
            setSts('dues')
        }
    }
var paidslip;
   
    return (
        <>
            <div className="payment-cont">
                <div className="payment-top">
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}>Total no. of transactions</h1>
                        <h1 style={{textAlign:'center'}}>{dataarr.length}</h1>
                    </div>
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}>Total no. of refral transactions</h1>
                        <h1 style={{textAlign:'center'}}>{refarray_length}</h1>
                    </div>
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}>Total no. of normal transactions</h1>
                        <h1 style={{textAlign:'center'}}>{dataarr.length - refarray.length}</h1>
                    </div>
                </div>
                <div className="payment-top">
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}>Total money -2% tax</h1>
                        <h1 style={{textAlign:'center'}}> &#8377; { Math.round(numberone[0].amount*1299*0.98 + numberone[1].amount*699*0.98 + numberone[2].amount*999*0.98 + numberone[3].amount*2999*0.98 + numberone[4].amount*399*0.98)}</h1>
                    </div>
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}>Total Refral money -X1/rzp</h1>
                        <h1 style={{textAlign:'center'}}>&#8377; {refarray.length * 50}</h1>
                    </div>
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}>Refral money -DUE</h1>
                        <h1 style={{textAlign:'center'}}>&#8377; {preamount}</h1>
                    </div>
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}>Refral money -PAID</h1>
                        <h1 style={{textAlign:'center'}}>&#8377; {paidamount}</h1>
                    </div>
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}>Final money value</h1>
                        <h1 style={{textAlign:'center'}}>&#8377; {Math.round(numberone[0].amount*1299*0.98 + numberone[1].amount*699*0.98 + numberone[2].amount*999*0.98 + numberone[3].amount*2999*0.98 + numberone[4].amount*399*0.98 - refarray.length * 50)}</h1>
                    </div>
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}>Total Refral money -X2</h1>
                        <h1 style={{textAlign:'center'}}>&#8377; {totalamount}</h1>
                    </div>
                    <div className="payment-top-one">
                        <h1 style={{textAlign:'center'}}> Courses purchased </h1>
                        <ul>
                            <li>{numberone[2].amount} :- Combo</li>
                            <li>{numberone[0].amount} :- 2023 Batch</li>
                            <li>{numberone[1].amount} :-2024 Batch</li>
                            <li>{numberone[3].amount} :- 1-1</li>
                            <li>{numberone[4].amount} :- Mateial</li>
                        </ul>
                    </div>
                </div>
                    <div className="payment-btns">
                        <button onClick={() =>{changests()}}>Dues</button>
                        <button onClick={() =>{changests()}}>Paid</button>
                    </div>
                <div className="payment-pay">
                    <h1 style={{ textAlign: 'center', textTransform: 'uppercase', color: 'white', fontSize: '4rem', fontFamily:"Dosis"}}>{sts}</h1>
                    { sts === 'dues' ?
                    payslip :
                    paidslip
                    }
                </div>
            </div>
        </>
    )
}

export default Payment