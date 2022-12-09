import "./material.css";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Part from './Part'
import io from 'socket.io-client'




const Personal = () => {

    const [toggle, setToggle] = useState(true);
    const [socket, setSocket] = useState(null);
    const [query, setQuery] = useState([]);
    const [ready, setReady] = useState(false);
    const [place, setPlace] = useState(-0)
    const [card, setCard] = useState();
    const link = process.env.REACT_APP_LINK;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (socket === null) {
            // setSocket(io('http://localhost:4000/admin'))
        }
        if (socket && ready === true) {
            socket.on('daata', (data) => {
                setToggle(false);
                const index = query.findIndex(({ room }) => room === data.room);
                if (query[index].dialogue[query[index].dialogue.length - 1] === data) {
                    //////
                } else {
                    query[index].dialogue.push(data);
                    setQuery(query);
                }
                if (place === index) {
                    setCard(query[index])
                }
                setTimeout(() => {
                    setToggle(true);
                }, 1000);
            })
        }
    }, [socket])
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        axios.get(link + '/personal/alldata/get').then((response) => {
            setQuery(response.data.value);
            setReady(true)
        })
    }, [])

    const openmsg = (value) => {
        setCard(value);
        setPlace(query.findIndex(({ room }) => room === value.room))
    }
    var vns = ''
    if (query.length > 0) {
        vns = (query).map(
            (query) => {
                return <>
                    <div onClick={() => { openmsg(query) }} style={query.personal === 'false' ? {backgroundColor: 'silver'} :  {backgroundColor: 'gold'} } className="Dquery-list-one">
                        <div className="Dquery-list-one-1">
                            <img src={query.image}></img>
                        </div>
                        <div className="Dquery-list-one-2">
                            <h1>{query.name === 'User' ? query.email : query.name}</h1>
                            {toggle === true ?
                                <h2>{query.dialogue[query.dialogue.length - 1].statement.slice(0, 35)}...</h2>
                                :
                                "Updating"
                            }
                        </div>
                        <div className="Dquery-list-one-3">
                            <h1>3</h1>
                        </div>
                    </div>
                </>
            }
        )
    }

    return (
        <>
            <div className="query-cont">
                <div className="query-array">
                    <div className="Dquery-list">
                        {vns}
                    </div>
                </div>
                <div className="query-boxy">
                    {card ? <Part query={card} /> : ''}
                </div>
            </div>
        </>
    )
}
export default Personal