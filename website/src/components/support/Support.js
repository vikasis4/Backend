import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Query from './Query'
import ProfileContext from '../../context/profile/ProfileContext'
import './support.css'
import leftarrow from '../../svg/leftarrow.svg'
import { Helmet } from 'react-helmet'



const Support = () => {

    const user = useContext(ProfileContext)
    const [state, setState] = useState('QUERY');
    const [statemsg, setStatemsg] = useState('QUERY');
    const [sub, setSub] = useState('');
    const [query, setQuery] = useState('');
    const id = user.profile.id
    const email = user.profile.username
    const navigate = useNavigate();
    const clink = process.env.REACT_APP_LINK;



    useEffect(() => {
        if (localStorage.getItem('reload-facility') === '89307988vikasREF') {
            ///
        }
        else {
            if (user.profile.void === '') {
                navigate('/')
                alert(`Only loged in users can ask doubt and query `)
            }
        }
    }, [user])


    const querysub = (e) => {
        var d = new Date();
        var mins = d.getMinutes();
        var hours = d.getHours();
        var date = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        e.preventDefault();
        if (sub.length < 31) {
            var type = 'user';
            axios.post(clink + '/query/box', { sub, query, id, email, type, state, mins, hours, date, month, year })
                .then((response) => {
                    if (response.data.message === 'success') {
                        alert(`${state} posted successfully`);
                        window.location.reload()
                    }
                })
        } else {
            alert('Number of letters in Topic field should be less than 30')
        }
    }



    //////////////////////////////////////////////////////////////////////////////////
    const [like, setLike] = useState('');
    const runFxn = (pills) => {
        var n = byte.indexOf(pills)
        setLike(<Query key={pills._id} card={pills} n={n} id={id} />)
        setStatemsg('showmesssage')
    }

    var list;
    var byte = ''

    if (user.profile.query[0]) {
        byte = user.profile.query;
        list = (byte).map(
            (byte) => {
                return (
                    <>
                        <div Key={byte._id} className="MOB-chat-list">
                            <div className="MOB-chat-list-pimp">

                                <div className="MOB-chat-list-child">
                                    <h1>Subject</h1>
                                    <h2>{byte.subject.length < 20 ? byte.subject : byte.subject.slice(0, 20) + "..."}</h2>
                                </div>
                                <div className="MOB-chat-list-child">
                                    <h1>Date</h1>
                                    <h2>{byte.date.slice(0, 10)}</h2>
                                </div>
                            </div>
                            <button onClick={() => { runFxn(byte) }} >Open</button>
                        </div>
                    </>
                )
            }
        )
    }


    /////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className="support-main deactivate-dis">
                <Helmet>
                    <title>RankBoost - Customer Support</title>
                </Helmet>
                <div className="videopage-gap"></div>
                <div className="gappers"></div>

                <div className="support-cont">
                    <div className="support-one">
                        <h1>customer support </h1>
                    </div>
                </div>
                <div className="support-change">
                    <div className="support-c1 "><button onClick={() => { setState('QUERY'); setStatemsg('showmessage') }} style={{ backgroundColor: state === 'QUERY' ? 'var(--s3)' : 'var(--c2)' }} className="support-btn1 spl-btn">Rasie a query</button></div>
                    <div className="support-c3 "><button onClick={() => { setState('session'); setStatemsg('showmessage') }} style={{ backgroundColor: state === 'session' ? 'var(--s3)' : 'var(--c2)' }} className="support-btn2 spl-btn">See all queries</button></div>
                </div>

                <div className="support-form">
                    {state === 'session' ?
                        <div className="answer-main">
                            <div className="answer-box">
                                {statemsg === 'showmessage' ?
                                    <>
                                        <div className="answer-one">
                                            <h2>All queries</h2>
                                        </div>
                                        <div className="answer-sec">
                                            {list === '' ?
                                                <> <h1 className="splicos">No queries or doubt right now</h1><div style={{ height: '3rem' }}></div> </>
                                                :
                                                list
                                            }
                                        </div>
                                    </>
                                    :
                                    like
                                }
                            </div>
                            <div className="forum-gap"></div>
                        </div>
                        :
                        <div className="forum-main">
                            <div className="forum-cont">
                                <div className="forum-display">
                                    <div className="forum-dis">
                                        <form method="post">
                                            <p>Topic <span style={{ fontSize: '1.4rem', fontFamily: 'Dosis, sans-serif' }}> "only 30 letters are allowed"</span></p>
                                            <input value={sub} style={{ padding: '1rem', border: '0.2rem solid white' }} onChange={(e) => setSub(e.target.value)} type="text"></input>
                                            <p>Enter your {state}</p>
                                            <textarea style={{ padding: '1rem', border: '0.2rem solid white', width: '-webkit-fill-available' }} value={query} onChange={(e) => setQuery(e.target.value)} name="message" rows="10" cols="70"></textarea>
                                            <button onClick={querysub} type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="forum-gap"></div>
                            </div>
                        </div>
                    }
                </div>
                <div className="support-gap"></div>
            </div>

            {/* /////////////////////////// MOBILE DEVICE SET //////////////////////////////////////////// */}

            <div className="MOB-support-main activate-dis">
                <div className="support-c0"><img onClick={() => { navigate('/') }} style={{ backgroundColor: 'var(--c2)' }} src={leftarrow}></img></div>
                <div className="MOB-support-change">
                    <div className="support-c1"><button onClick={() => { setState('QUERY'); setStatemsg('showmessage') }} style={{ backgroundColor: state === 'QUERY' ? 'var(--s3)' : 'var(--c2)' }} className="support-btn1 MOB-spl-btn">Raise a query</button></div>
                    <div className="support-c3"><button onClick={() => { setState('session'); setStatemsg('showmessage') }} style={{ backgroundColor: state === 'session' ? 'var(--s3)' : 'var(--c2)' }} className="support-btn2 MOB-spl-btn">See all queries</button></div>
                </div>

                <div className="MOB-support-form">
                    {state === 'session' ?

                        statemsg === 'showmessage' ?
                            <div className="MOB-chat-list-cont">
                                {list === '' ?
                                    <> <h1 className="splicos">No queries right now</h1><div style={{ height: '3rem' }}></div> </>
                                    :
                                    list
                                }
                            </div>
                            :
                            <div className="MOB-answer-main">
                                {like}
                            </div>
                        :
                        <div className="MOB-forum-main">
                            <div className="MOB-forum-cont">
                                <div className="MOB-forum-head"><h1>{state[0] + state.slice(1).toLowerCase()}</h1></div>
                                <div className="MOB-forum-display">
                                    <div className="MOB-forum-dis">
                                        <form className="MOB-forum-manage" method="post">
                                            <div>
                                                <p>Topic <span style={{ fontSize: '2.6rem', marginLeft: '1rem', fontFamily: 'Dosis, sans-serif' }}> "only 30 letters are allowed"</span></p>
                                                <input value={sub} style={{ padding: '1rem', border: '0.2rem solid white' }} onChange={(e) => setSub(e.target.value)} type="text"></input>
                                                <p>Enter your {state}</p>
                                                <textarea style={{ padding: '1rem', border: '0.2rem solid white', width: '-webkit-fill-available' }} value={query} onChange={(e) => setQuery(e.target.value)} name="message" rows="10" cols="70"></textarea>
                                            </div>
                                            <button onClick={querysub} type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Support