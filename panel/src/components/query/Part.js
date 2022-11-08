import "./material.css";
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import BroadcastingContext from "../../context/broadcasting/BroadcastingContext";



const Part = (props) => {

    const query = props.query;
    const [chat, setChat] = useState();
    const broadcast = useContext(BroadcastingContext);
    const [dialogues, setDialogues] = useState(query.dialogue)
    const [toogle, setToggle] = useState('one');
    const plink = process.env.REACT_APP_VIDEO_LINK;
    const link = process.env.REACT_APP_LINK;
    var scrolldiv = document.getElementById('scrollchat');


    useEffect(() => {
        if (broadcast.rmessages) {
            setDialogues([...dialogues, broadcast.rmessages]);
            runfnbro();
        }
    }, [broadcast.rmessages])


    ///////////////////////////////////////////////////////////////////////////
    const submitchat = (e, data) => {

        var d = new Date();
        var mins = d.getMinutes();
        var hours = d.getHours();
        var date = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();

        e.preventDefault()
        axios.post(link + '/chat/user', {
            statement: chat,
            type: 'vikas',
            id: data.userid,
            place: data.place,
            datee: data.date,
            email: data.email,
            mins, hours, date, month, year
        }).then((response) => {
            if (response.data.status === 'no') {
                alert('something went wrong, piliz try again')
            }
        })
        setToggle('two')
        dialogues.push({
            statement: chat,
            type: 'vikas',
            id: data.userid,
            place: data.place,
            datee: data.date,
            email: data.email,
            mins, hours, date, month, year
        });
        broadcast.sendText({
            statement: chat,
            type: 'vikas',
            id: data.userid,
            place: data.place,
            datee: data.date,
            email: data.email,
            mins, hours, date, month, year,
            connection: query.room
        })
        scrolldiv.scrollTop = scrolldiv.scrollHeight;
        setTimeout(() => {
            setToggle('one')
        }, 500);
        setChat('')
    }
    const openimg = (read) => {
        window.open(`${plink}${read}`)
    }
    const datearr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    ///////////////////////////////////////////////////////////////////////////////
    var text = '';
    var current = '';

    const runfnbro = () => {

        if (dialogues) {

            current = query
            text = (dialogues).map((dialogues) => {
                if (dialogues.type === 'vikas') {
                    return (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', placeItems: 'flex-end', marginBottom: '1rem' }}>
                                <p className="chat-p chat-vikas" style={dialogues.content === 'image' ? { padding: '0.4rem' } : { padding: '1rem 2rem', textAlign: 'right' }}>{
                                    dialogues.content === "img" ? <img className="open-img-new" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={`${plink}${dialogues.statement}`} onClick={() => { openimg(dialogues.statement) }} />
                                        :
                                        dialogues.statement
                                }</p>
                                {
                                    dialogues.mins.toString().length === 1 ?
                                        <p className="loca-loca">{dialogues.hours}:0{dialogues.mins} &nbsp; {dialogues.date} {datearr[dialogues.month]} {dialogues.year}</p>
                                        :
                                        <p className="loca-loca">{dialogues.hours}:{dialogues.mins} &nbsp; {dialogues.date} {datearr[dialogues.month]} {dialogues.year}</p>
                                }
                            </div>
                        </>
                    )
                }
                else if (dialogues.type === 'user') {
                    return (
                        <>
                            <div style={{ display: 'flex', marginBottom: '1rem', flexDirection: 'column', justifyContent: 'flex-end', placeItems: 'flex-start' }}>
                                <p className="chat-p chat-user" style={dialogues.content === 'image' ? { padding: '0.4rem' } : { padding: '1rem 2rem', textAlign: 'left' }}>{
                                    dialogues.content === "image" ? <img className="open-img-new" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={`http://localhost:4000${dialogues.statement}`} onClick={() => { openimg(dialogues.statement) }} />
                                        :
                                        dialogues.statement
                                }</p>
                                {
                                    dialogues.mins.toString().length === 1 ?
                                        <p className="loca-loca">{dialogues.hours}:0{dialogues.mins} &nbsp; {dialogues.date} {datearr[dialogues.month]} {dialogues.year}</p>
                                        :
                                        <p className="loca-loca">{dialogues.hours}:{dialogues.mins} &nbsp; {dialogues.date} {datearr[dialogues.month]} {dialogues.year}</p>
                                }
                            </div>
                        </>
                    )
                }
            })
        }
    }
    runfnbro()

    return (
        <>
            <div className="query-main">
                <div id="scrollchat"  className="query-one">
                    {toogle === 'one' ?
                        <>
                            {text}
                        </>

                        : <h1>Please wait</h1>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                </div>
                <div className="query-chat">
                    <input type="text" value={chat} onChange={(e) => { setChat(e.target.value) }}></input>
                    <button onClick={(e) => { submitchat(e, current) }}>Send</button>
                </div>
            </div>
        </>
    )
}

export default Part