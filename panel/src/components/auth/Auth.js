import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import './auth.css'
import PanelContext from '../../context/panelentry/PanelContext'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client';
ChartJS.register(...registerables);

const NonApiLink = process.env.REACT_APP_VIDEO_LINK;
var socket = io('http://localhost:8080/admin', {transports: ["websocket"]});
// var socket = io('https://wbb.rankboost.live/admin', {transports: ["websocket"]});



const Auth = () => {

    const [key, setKey] = useState('')
    const link = process.env.REACT_APP_LINK
    const panel = useContext(PanelContext)
    const navigate = useNavigate()
    //////////////////////// WEB SOCKET ///////////////////////////////////
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const [count, setCount] = useState(0);
    
    useEffect(() => {

        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit('update-me')
        });
        socket.on('live-listen', (data) => {
            setCount(data.count);
            panel.setWebsocket(data)
        })
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        socket.on('pong', () => {
            setLastPong(new Date().toISOString());
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);


    /////////////////////////// TOKEN //////////////////////////////////////
    const token = localStorage.getItem('authinfo')
    useEffect(() => {
        if (token) {
            axios.post(link + '/keyverify', { key: token }).then(function (response) {
                if (response.data.status === 'yes') {
                    panel.setVerify(true)
                } else if (response.data.status === 'no') {
                    alert('Wrong key')
                }
            })
        }
    }, [])
    const submitkey = (e) => {
        e.preventDefault();
        axios.post(link + '/keyverify', { key }).then(function (response) {
            if (response.data.status === 'yes') {
                panel.setVerify(true)
                localStorage.setItem('authinfo', key)
            } else if (response.data.status === 'no') {
                alert('Wrong key')
            }
        })
    }

    ////////////////////////////// TRAFFIC ////////////////////////////////////
    const [regtraffic, setRegtraffic] = useState([])
    const [non_regtraffic, setNon_regtraffic] = useState([])
    const [user, setUser] = useState([])
    const [subs, setSubs] = useState([])
    const [nonsubs, setNonsubs] = useState([])

    var timer;
    const [seconds, setSeconds] = useState(0)
    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds + 1);
            if (seconds === 20) {
                setUser([])
                setRegtraffic([])
                setNon_regtraffic([])
                setSubs([])
                setNonsubs([])
                setSeconds(0)
                freshrepo()
            }
        }, 1000)
        return () => clearInterval(timer)
    })
    useEffect(() => {
        freshrepo()
    }, [])


    const freshrepo = () => {
        axios.get(link + '/userswill/info').then((response) => {
            setUser(response.data)
        })
    }
    useEffect(() => {
        for (let i = 0; i < user.length; i++) {
            if (user[i].subscription === 'true') {
                subs.push(user[i]);
                setSubs([...subs])
            }
            else if (user[i].subscription === 'false') {
                nonsubs.push(user[i]);
                setNonsubs([...nonsubs])
            }
        }
    }, [user])
  
    ////////////////////////////// TRAFFIC ////////////////////////////////////
    const ds = new Date();
    const monthy = ds.getUTCMonth() + 1;
    const yeary = ds.getUTCFullYear();

    const [month, setMonth] = useState(monthy)
    const [year, setYear] = useState(yeary)
    const [date, setDate] = useState([])
    const [montharr, setMontharr] = useState([])
    const [history, setHistory] = useState([])
    const [finaldate, setFinaldate] = useState([])

    useEffect(() => {
        axios.get(link + '/history/traffic').then((response) => {
            setHistory(response.data)
        })
    }, [])
    useEffect(() => {
        if (history.length > 0) {
            hisudt()
        }
    }, [history])
    const hisudt = () => {
        for (let i = 0; i < history.length; i++) {
            if (history[i].year === parseInt(year)) {
                if (history[i].month === parseInt(month)) {
                    montharr.push(history[i]);
                    setMontharr([...montharr])
                    if (i === history.length - 1) {
                        montharfxn()
                    }
                } else {
                    if (i === history.length - 1) {
                        montharfxn()
                    }
                    continue;
                }
            } else {
                if (i === history.length - 1) {
                    montharfxn()
                }
                continue;
            }
        }
    }
    const hesoyam = () => {
        setMontharr([]);
        setDate([]);
        setFinaldate([]);
        if (montharr.length === 0 && date.length === 0 && finaldate.length === 0) {
            hisudt();
        }
    }

    const montharfxn = () => {
        for (let i = 0; i < 31; i++) {
            date.push([]);
            setDate([...date]);
            if (i === 30) {
                colombo()
            }
        }
    }
    const colombo = () => {
        for (let i = 0; i < montharr.length; i++) {
            date[montharr[i].day - 1].push(montharr[i]);
            setDate([...date]);
            if (i === montharr.length - 1) {
                updatedate()
            }
        }
    }
    const updatedate = () => {
        for (let i = 0; i < 31; i++) {
            finaldate.push(date[i].length);
            setFinaldate([...finaldate])
        }
    }

    /////////////////////////////////////////////////////////////////////////////
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        datasets: [
            {
                label: "work",
                data: finaldate,
                borderColor: 'orange',

            }
        ]
    }



    return (
        <>
            {
                panel.verify === true ?
                    <>
                        <div className="dash-main">
                            <div className="dash-one">
                                <div className="dash-cont">
                                    <h1 style={{ textAlign: 'center' }}>Total registered users</h1>
                                    <h1 style={{ textAlign: 'center' }}>{user.length}</h1>
                                </div>
                                <div className="dash-cont">
                                    <h1 style={{ textAlign: 'center' }}>Total subscribed users</h1>
                                    <h1 style={{ textAlign: 'center' }}>{subs.length}</h1>
                                </div>

                                <div className="dash-cont">
                                    <h1 style={{ textAlign: 'center' }}>Online registered users</h1>
                                    <h1 style={{ textAlign: 'center' }}>{regtraffic.length}</h1>
                                </div>

                                <div className="dash-cont">
                                    <h1 style={{ textAlign: 'center' }}>Online non-registered users</h1>
                                    <h1 style={{ textAlign: 'center' }}>{non_regtraffic.length}</h1>
                                </div>
                                <div className="dash-cont">
                                    <h1 style={{ textAlign: 'center' }}>History of traffic</h1>
                                    <h1 style={{ textAlign: 'center' }}>{history.length}</h1>
                                </div>

                                <div id="real21" onClick={() => navigate('/livepro')} className="dash-cont">
                                    <h1 style={{ textAlign: 'center' }}>Realtime Traffic</h1>
                                    <h1 style={{ textAlign: 'center' }}>{count}</h1>
                                </div>
                            </div>
                            <div className="graph-update">
                                <input type="number" value={month} onChange={(e) => { setMonth(e.target.value) }} />
                                <input type="number" value={year} onChange={(e) => { setYear(e.target.value) }} />
                                <button onClick={() => { hesoyam() }}>Show</button>
                            </div>

                            <Line
                                data={data}
                                style={{ backgroundColor: 'white', color: 'red' }}
                            />
                        </div>

                    </>
                    :
                    <div className="key-cont">
                        <h1 style={{ textAlign: 'center' }}>Enter security key</h1>
                        <input type="text" value={key} onChange={(e) => { setKey(e.target.value) }}></input>
                        <button type="button" onClick={(e) => { submitkey(e) }}>Verify</button>
                    </div>
            }
        </>
    )
}

export default Auth