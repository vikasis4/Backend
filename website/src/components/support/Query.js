import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './support.css'
import ProfileContext from '../../context/profile/ProfileContext'
import Logo from './favicon.png'
import pins from '../../svg/pins.svg'
import FormData from 'form-data'
import cross from '../../svg/cross.svg'
import Send from '../../svg/send.svg'



const Query = (props) => {

    const { dialogue, subject, date } = props.card;
    const profile = useContext(ProfileContext);
    const id = props.id;
    const n = props.n;
    const [chat, setChat] = useState('');
    const [multer, setMulter] = useState(true);
    const [pulter, setPulter] = useState(true);
    const clink = process.env.REACT_APP_LINK
    const plink = process.env.REACT_APP_VIDEO_LINK
    const [dialogues, setDialogues] = useState(dialogue)
    const [imig, setImig] = useState();
    var cont = ''
    let data = new FormData();
    const [hidimg, setHidimg] = useState({
        left: '-100rem'
    })
    const [will, setWill] = useState({display:"none", height:'0', transform: 'translateX: -10rem'})
    var scrolldiv = document.getElementById('scrollchat');

    //////////////////////////////////////////////////////////////////////////

    const submitchat = () => {
        var d = new Date();
        var mins = d.getMinutes();
        var hours = d.getHours();
        var dates = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();

        const objected = {
            statement: chat,
            type: 'user',
            content: 'text',
            mins, hours, date: dates, month, year
        }

        if (chat.length > 0) {
            axios.post(clink + '/chat/user', {
                statement: chat,
                type: 'user',
                id: id,
                place: n,
                date: dates,
                mins, hours, datee: date, month, year
            }).then((response) => {
                if (response.data.status === 'no') {
                    alert('something went wrong, try again')
                }
            })
            setDialogues([...dialogues, {
                statement: chat,
                type: 'user',
                content: 'text',
                mins, hours, date: dates, month, year
            }])
            setTimeout(() => {
                // buga buga buga
            }, 1200);
            scrolldiv.scrollTop = scrolldiv.scrollHeight;
            setChat('')
        }
        else {
            alert('Cannot send empty message')
        }
    }


    const handleimg = () => {
        if (multer === true) {
            setMulter(false)
        } else {
            setMulter(true)
        }
    }
    const newchange = () => {
        if (pulter === true) {
            setPulter(false)
        } else {
            setPulter(true)
        }
    }
    useEffect(() => {
        if (pulter === false) {
            setWill({
                height:'0',
                display: 'block',
                transform: 'translateX: 0rem'
            })
            
        } else {
            setWill({
                transform: 'translateX: -10rem',
                height:'0',
                display: 'none'
            })
        }
    }, [pulter])

    useEffect(() => {
        if (multer === false) {
            setHidimg({
                left: '0rem'
            })

        } else {
            setHidimg({
                left: '-100rem'
            })
        }
    }, [multer])

    const handleimgupload = (e) => {
        var d = new Date();
        var mins = d.getMinutes();
        var hours = d.getHours();
        var dates = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();

        e.preventDefault()
        data.append('image', imig);
        data.append('type', 'user');
        data.append("id", id);
        data.append("place", n);
        data.append("date", dates);
        data.append("hours", hours);
        data.append("mins", mins);
        data.append("month", month);
        data.append("year", year);
        data.append("datee", date);

        if (imig) {
            axios.post(clink + '/img/query', data,
                {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data`,
                    }
                }).then((response) => {
                    if (response.data.status === 'no') {
                        alert('something went wrong, plz try again')
                    }
                    else if (response.data.status === 'yes') {
                        setDialogues([...dialogues, {
                            statement: `/query/${response.data.link}`,
                            type: 'user',
                            content: 'image',
                            mins, hours, date: dates, month, year
                        }])
                        setTimeout(() => {
                            // buga buga buga  
                        }, 1200);
                    }
                })
        } else {
            alert('Select image, input bar is empty')
        }

    }
    const openimg = (read) => {
        window.open(`${plink}${read}`)
    }


    var images = () => {
        return (
            <>
                <div className="query-logo-simp">
                    <h1>{profile.profile.username.slice(0, 1)}</h1>
                </div>
            </>
        )
    }
    const datearr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const mapfxn = () => {

        if (dialogues) {

            var carryDate = 40;

            cont = (dialogues).map((dialogues) => {

                if (dialogues.type === 'vikas') {
                    if (carryDate === dialogues.date) {
                        return (
                            <>


                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', placeItems: 'flex-start', marginBottom: '1rem' }}>
                                    <p className="chat-p chat-vikas" style={dialogues.content === 'image' ? { padding: '0.4rem' } : { padding: '1rem 2rem' }}>{
                                        dialogues.content === "img" ? <img className="open-img-new" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={`${plink}${dialogues.statement}`} onClick={() => { openimg(dialogues.statement) }} />
                                            :
                                            dialogues.statement
                                    }</p>
                                    <div className="query-date-manage">
                                        {
                                            dialogues.mins.toString().length === 1 ? <>
                                                <img className="chat-img" src={Logo}></img>
                                                <p style={{ color: 'black' }}>{dialogues.hours > 12 ? `${dialogues.hours - 12}:0${dialogues.mins} pm` : dialogues.hours + ':0' + dialogues.mins + ' am'}</p>
                                            </>
                                                :
                                                <>
                                                    <img className="chat-img" src={Logo}></img>
                                                    <p style={{ color: 'black' }}>{dialogues.hours > 12 ? `${dialogues.hours - 12}:${dialogues.mins} pm` : dialogues.hours + ':' + dialogues.mins + ' am'}</p>
                                                </>
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    } else {
                        carryDate = dialogues.date;
                        return (
                            <>
                                <h5 className="chat-date">{`${dialogues.date} ${datearr[dialogues.month]} ${dialogues.year}`}</h5>



                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', placeItems: 'flex-start', marginBottom: '1rem' }}>
                                    <p className="chat-p chat-vikas" style={dialogues.content === 'image' ? { padding: '0.4rem' } : { padding: '1rem 2rem' }}>{
                                        dialogues.content === "img" ? <img className="open-img-new" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={`${plink}${dialogues.statement}`} onClick={() => { openimg(dialogues.statement) }} />
                                            :
                                            dialogues.statement
                                    }</p>
                                    <div className="query-date-manage">
                                        {
                                            dialogues.mins.toString().length === 1 ? <>
                                                <img className="chat-img" src={Logo}></img>
                                                <p style={{ color: 'black' }}>{dialogues.hours > 12 ? `${dialogues.hours - 12}:0${dialogues.mins} pm` : dialogues.hours + ':0' + dialogues.mins + ' am'}</p>
                                            </>
                                                :
                                                <>
                                                    <img className="chat-img" src={Logo}></img>
                                                    <p style={{ color: 'black' }}>{dialogues.hours > 12 ? `${dialogues.hours - 12}:${dialogues.mins} pm` : dialogues.hours + ':' + dialogues.mins + ' am'}</p>
                                                </>
                                        }
                                    </div>
                                </div>
                            </>
                        )

                    }
                }
                else if (dialogues.type === 'user') {
                    if (carryDate === dialogues.date) {
                        return (
                            <>


                                <div style={{ display: 'flex', marginBottom: '1rem', flexDirection: 'column', justifyContent: 'flex-end', placeItems: 'flex-end' }}>
                                    <p className="chat-p chat-user" style={dialogues.content === 'image' ? { padding: '0.4rem' } : { padding: '1rem 2rem' }}>{
                                        dialogues.content === "image" ? <img className="open-img-new" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={`${plink}${dialogues.statement}`} onClick={() => { openimg(dialogues.statement) }} />
                                            :
                                            dialogues.statement
                                    }
                                    </p>
                                    <div className="query-date-manage">
                                        {
                                            dialogues.mins.toString().length === 1 ? <>
                                                <p style={{ color: 'black' }}>{dialogues.hours > 12 ? `${dialogues.hours - 12}:0${dialogues.mins} pm` : dialogues.hours + ':0' + dialogues.mins + ' am'}</p>
                                                {profile.profile.img === 'empty' ? images() : <img className="chat-img" src={profile.profile.img}></img>}
                                            </>
                                                :
                                                <>
                                                    <p style={{ color: 'black' }}>{dialogues.hours > 12 ? `${dialogues.hours - 12}:${dialogues.mins} pm` : dialogues.hours + ':' + dialogues.mins + ' am'}</p>
                                                    {profile.profile.img === 'empty' ? images() : <img className="chat-img" src={profile.profile.img}></img>}
                                                </>
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    } else {
                        carryDate = dialogues.date;
                        return (
                            <>
                                <h5 className="chat-date">{`${dialogues.date} ${datearr[dialogues.month]} ${dialogues.year}`}</h5>



                                <div style={{ display: 'flex', marginBottom: '1rem', flexDirection: 'column', justifyContent: 'flex-end', placeItems: 'flex-end' }}>
                                    <p className="chat-p chat-user" style={dialogues.content === 'image' ? { padding: '0.4rem' } : { padding: '1rem 2rem' }}>{
                                        dialogues.content === "image" ? <img className="open-img-new" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={`${plink}${dialogues.statement}`} onClick={() => { openimg(dialogues.statement) }} />
                                            :
                                            dialogues.statement
                                    }
                                    </p>
                                    <div className="query-date-manage">
                                        {
                                            dialogues.mins.toString().length === 1 ? <>
                                                <p style={{ color: 'black' }}>{dialogues.hours > 12 ? `${dialogues.hours - 12}:0${dialogues.mins} pm` : dialogues.hours + ':0' + dialogues.mins + ' am'}</p>
                                                {profile.profile.img === 'empty' ? images() : <img className="chat-img" src={profile.profile.img}></img>}
                                            </>
                                                :
                                                <>
                                                    <p style={{ color: 'black' }}>{dialogues.hours > 12 ? `${dialogues.hours - 12}:${dialogues.mins} pm` : dialogues.hours + ':' + dialogues.mins + ' am'}</p>
                                                    {profile.profile.img === 'empty' ? images() : <img className="chat-img" src={profile.profile.img}></img>}
                                                </>
                                        }
                                    </div>
                                </div>
                            </>
                        )

                    }
                }
            })
        }
    }
    mapfxn()
    return (
        <>
            <div className="query-main deactivate-dis">
                <div id="scrollchat" className="query-one lkjhg">
                    {cont}
                </div>
                <div className="query-last">
                    <div className="query-chat">
                        <div className="pins" onClick={() => { newchange() }} ><img src={pins} /></div>
                        <input type="text" id="inputfield" value={chat} onChange={(e) => { setChat(e.target.value) }}></input>
                        <div className="senda" onClick={submitchat}><img src={Send} /></div>
                    </div>
                </div>
                <div className="img-upload" style={will}>
                    <div className="img-cont">
                        <form method="post" enctype="multipart/form-data">
                            <input type="file" onChange={(e) => { setImig(e.target.files[0]) }} name="image"></input>
                            <button onClick={(e) => { handleimgupload(e); newchange() }}>upload</button>
                        </form>
                        <img onClick={() => { newchange() }} src={cross}></img>
                    </div>
                </div>
            </div>

            {/*   MOBILE SCREEN   */}

            <div className="MOB-query-main activate-dis">
                <div id="scrollchat" className="MOB-query-one">
                    {cont}
                </div>
                <div className="MOB-query-last">
                    <div className="MOB-query-chat">
                        <div className="MOB-pins" onClick={() => { handleimg() }} ><img src={pins} /></div>
                        <input type="text" id="inputfield" value={chat} onChange={(e) => { setChat(e.target.value) }}></input>
                        <div className="MOB-senda" onClick={submitchat}><img src={Send} /></div>
                    </div>
                </div>
                <div className="MOB-img-upload" style={hidimg}>
                    <div className="MOB-img-cont">
                        <form method="post" enctype="multipart/form-data">
                            <input type="file" onChange={(e) => { setImig(e.target.files[0]) }} name="image"></input>
                            <button onClick={(e) => { handleimgupload(e); handleimg() }}>upload</button>
                        </form>
                        <img onClick={() => { handleimg() }} src={cross}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Query