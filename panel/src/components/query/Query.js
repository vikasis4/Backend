import "./material.css";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Part from './Part'

const Query = () => {

    const [query, setQuery] = useState([]);
    const [card, setCard] = useState()
    const link = process.env.REACT_APP_LINK;
    const [stat, setStat] = useState('New')

    useEffect(() => {
        axios.get(link + '/query/fetch').then((response) => {
            setQuery(response.data.query)
            console.log(response.data.query);
        })
    }, [])

    var ans = ''
    var n = 0;

    if (query.length > 0) {
        ans = (query).map(
            (query) => {
                return <Part query={query} n={n++} />
            }
        )
    }

    var dns = ''
    var vns = ''
    var mns = ''
    var newbe = 0
    var holdbe = 0
    var solvedbe = 0

    const changestate = (id, bruh) => {
        axios.post(link+'/stat/query/update', {id: id, status:bruh}).then((response) => {
            if (response.data.status === 'yes'){
                window.location.reload()
            }else{
                alert("Something went wrong")
            }
        })
    }

    if (query.length > 0) {
        vns = (query).map(
            (query) => {
                if (query.stat === 'resolved') {
                    solvedbe++
                    return (
                        <div className="query-list-one">
                             <div className="query-state-btn">
                                <button onClick={() =>{changestate(query._id, "hold")}}>Hold</button>
                                <button onClick={() =>{changestate(query._id, "resolved")}}>Resolved</button>
                            </div>
                            <h2 style={{ margin: 0, textAlign: 'right' }}>{query.type}</h2>
                            <h1>{query.email}</h1>
                            <h3>{query.subject}</h3>
                            <h4 style={{textAlign: 'right', }} className="date-btn">{query.date.slice(0, 10)}</h4>
                            <button onClick={()=>{openmsg(query)}} className="query-open-btn">Open</button>
                        </div>
                    )

                }
            }
        )
        mns = (query).map(
            (query) => {
                if (query.stat === 'new') {
                    newbe++;
                    return (
                        <div className="query-list-one">
                            <div className="query-state-btn">
                                <button onClick={() =>{changestate(query._id, "hold")}}>Hold</button>
                                <button onClick={() =>{changestate(query._id, "resolved")}}>Resolved</button>
                            </div>
                            <h2 style={{ margin: 0, textAlign: 'right' }}><span style={query.type === 'QUERY' ? {color:'red'} : {color:'blue'}}>{query.type}</span></h2>
                            <h1>{query.email}</h1>
                            <h3>{query.subject}</h3>
                            <h4 style={{textAlign: 'right', }} className="date-btn">{query.date.slice(0, 10)}</h4>
                            <button onClick={()=>{openmsg(query)}} className="query-open-btn">Open</button>
                        </div>
                    )
                }
            }
        )
        dns = (query).map(
            (query) => {
                if (query.stat === 'hold') {
                    holdbe++
                    return (
                        <div className="query-list-one">
                             <div className="query-state-btn">
                                <button onClick={() =>{changestate(query._id, "hold")}}>Hold</button>
                                <button onClick={() =>{changestate(query._id, "resolved")}}>Resolved</button>
                            </div>
                            <h2 style={{ margin: 0, textAlign: 'right' }}>{query.type}</h2>
                            <h1>{query.email}</h1>
                            <h3>{query.subject}</h3>
                            <h4 style={{textAlign: 'right', }} className="date-btn">{query.date.slice(0, 10)}</h4>
                            <button onClick={()=>{openmsg(query)}} className="query-open-btn">Open</button>
                        </div>
                    )
                }
            }
        )
    }
    const updatestat = (value) => {
        setStat(value)
    }
    const openmsg = (value) => {
        setCard(value)
    }


    return (
        <>
            <div className="query-cont">
                <div className="query-array">
                    <div className="query-top">
                        <div className="query-btn-hold">
                            <button onClick={() => { updatestat("New") }}>New</button>
                            <h1 style={{textAlign: 'center'}}>{newbe}</h1>
                        </div>
                        <div className="query-btn-hold">
                            <button onClick={() => { updatestat("Resloved") }}>Resolved</button>
                            <h1 style={{textAlign: 'center'}}>{solvedbe}</h1>
                        </div>
                        <div className="query-btn-hold">
                            <button onClick={() => { updatestat("On hold") }}>On hold</button>
                            <h1 style={{textAlign: 'center'}}>{holdbe}</h1>
                        </div>

                    </div>
                    <div className="query-status">
                        <h1 style={{textAlign: 'center'}}>{stat}</h1>
                    </div>
                    <div className="query-list">
                        {stat === 'Resloved' ?  vns : ''}
                        {stat === 'On hold' ? dns : ''}
                        {stat === 'New' ? mns : ''}
                    </div>
                </div>
                <div className="query-boxy">
                    {card ? <Part query={card} /> : ''}
                </div>
            </div>
        </>
    )
}
export default Query