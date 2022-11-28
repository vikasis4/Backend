import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './personal.css'
import ProfileContext from '../../context/profile/ProfileContext'
import Logo from '../support/favicon.png'
import pins from '../../svg/pins.svg'
import FormData from 'form-data'
import cross from '../../svg/cross.svg'
import Send from '../../svg/send.svg'
import io from 'socket.io-client'
import downloadPersonal from '../../svg/downloadPersonal.svg'
import gross from '../../svg/cross.svg'


const Query = () => {


    const [dialogue, setDialogue] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const profile = useContext(ProfileContext);
    const [cart, setCart] = useState(profile.profile.cart);
    const [id, setId] = useState('');
    const [chat, setChat] = useState('');
    const [multer, setMulter] = useState(true);
    const [pulter, setPulter] = useState(true);
    const clink = process.env.REACT_APP_LINK
    const plink = process.env.REACT_APP_VIDEO_LINK
    const [dialogues, setDialogues] = useState(dialogue)
    const [imig, setImig] = useState();
    const [activation, setActivation] = useState(false);
    const [room, setRoom] = useState('');
    const [progress, setProgress] = useState(0);
    const [downloads, setDownloads] = useState([]);
    const [downloadpercent, setDownloadpercent] = useState(0 + '%');
    const [urls, setUrls] = useState([]);
    const NonApiLink = process.env.REACT_APP_VIDEO_LINK;
    const [variables, setVariables] = useState({
        var1: 0,
        var2: 0,
        var3: 0,
        var4: 0,
        var5: 0,
    })

    useEffect(() => {
        axios.get(clink + '/variables/fetch').then((response) => {
            setVariables(response.data[0])
        })
    }, [])


    var cont = ''
    let data = new FormData();
    const [hidimg, setHidimg] = useState({
        left: '-100rem'
    })
    const [will, setWill] = useState({ display: "none", height: '0', transform: 'translateX: -10rem' })
    var scrolldiv = document.getElementById('scrollchat');
    ///////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (socket === null) {
            setSocket(io(`${NonApiLink}/normal`));
        }
        if (socket && loading === true) {
            socket.emit("join-room", room);
            socket.on('data', (data) => {
                if (dialogues[dialogues.length - 1] === data) {
                    //
                } else {
                    dialogues.push(data);
                    setDialogues(dialogues)
                    scrolldiv.scrollTop = scrolldiv.scrollHeight;
                }
            })
        }
    }, [socket, loading])

    //////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (localStorage.getItem('reload-facility') === '89307988vikasREF') {
            if (profile.profile.subarray.find(({ name }) => name === 'combo') || profile.profile.subarray.find(({ name }) => name === 'combo')) {
                setActivation(true)
            }
        }
    }, [profile])
    useEffect(() => {
        if (activation === true) {
            axios.post(clink + '/personal/data/get', { id: profile.profile.id }).then((response) => {
                const harry = response.data.value.dialogue.filter(({ content }) => content === 'image');
                for (let i = 0; i < harry.length; i++) {
                    downloads.push({ id: harry[i]._id, state: false, show: '' });
                    urls.push({ id: harry[i]._id, url: '' });
                };
                setDialogue(response.data.value.dialogue);
                setRoom(response.data.value.room)
                setLoading(true)
                setId(response.data.value.userid)
                setDialogues(response.data.value.dialogue);
            })
        }
    }, [activation])


    /////////////////////////////////////////////////////////////////////////


    const submitchat = () => {
        var d = new Date();
        var mins = d.getMinutes();
        var hours = d.getHours();
        var dates = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        const objected = {
            chat: chat,
            type: 'user',
            content: 'text',
            room,
            id: profile.profile.id,
            mins, hours, date: dates, month, year
        }
        const lolbjected = {
            statement: chat,
            type: 'user',
            content: 'text',
            room,
            mins, hours, date: dates, month, year
        }
        if (chat.length > 0) {
            axios.post(clink + '/personal/chat/text', objected).then((response) => {
                if (response.data.status === 'no') {
                    alert('something went wrong, try again')
                }
            })
            dialogues.push(lolbjected)
            setDialogues(dialogues)
            socket.emit('Texts', lolbjected)
            scrolldiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
                height: '0',
                display: 'block',
                transform: 'translateX: 0rem'
            })

        } else {
            setWill({
                transform: 'translateX: -10rem',
                height: '0',
                display: 'none'
            })
        }
    }, [pulter])

    useEffect(() => {
        if (multer === false) {
            setHidimg({
                left: '0'
            })

        } else {
            setHidimg({
                display: '-100rem'
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
        data.append("date", dates);
        data.append("hours", hours);
        data.append("mins", mins);
        data.append("month", month);
        data.append("year", year);

        if (imig) {
            axios.post(clink + '/personal/chat/image', data, {
                onUploadProgress: (data) => {
                    setProgress(Math.round((data.loaded / data.total) * 100));
                }
            },
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
                        downloads.push({ id: response.data.id, state: false, show: '' });
                        urls.push({ id: response.data.id, url: '' });
                        dialogues.push({
                            statement: `/query/${response.data.link}`,
                            type: 'user',
                            content: 'image',
                            room,
                            _id: response.data.id,
                            mins, hours, date: dates, month, year
                        })
                        setDialogues(dialogues)
                        socket.emit('Texts', {
                            statement: `/query/${response.data.link}`,
                            type: 'user',
                            content: 'image',
                            room,
                            mins, hours, date: dates, month, year
                        })

                    }
                })
        } else {
            alert('Select image, input bar is empty')
        }

    }
    const openimg = (read) => {
        window.open(`${plink}${read}`)
    }
    const updatecart = (value) => {
        cart.push({ name: value })
        setCart(cart);
        const user = profile.profile
        profile.setProfile({ ...user, cart })
        if (profile.profile.void === 'no') {
            axios.post(clink + '/cart', {
                id: profile.profile.id,
                cart
            }).then(response => {
                if (response.data.status === 'yes') {
                    ////
                } else {
                    alert('Something went wrong, please try again later')
                }
            })
        } else {
            localStorage.setItem('cart', cart)
        }
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
    const [download, setDownload] = useState(false)


    /////////////////////////////////////////////////////////////////////////////////////////

    var xhr = new XMLHttpRequest();

    const downloadNow = (img) => {

        if (downloadpercent === '0%') {
            var index = downloads.findIndex(({ id }) => id === img._id);
            downloads[index].show = 'start'


            xhr.onprogress = (e) => {
                var percent_complete = (e.loaded / e.total) * 100;
                setDownloadpercent(`${Math.floor(percent_complete)} %`);
            }
            xhr.open("GET", `${plink}${img.statement}`);
            xhr.responseType = "blob";
            xhr.onload = response;
            xhr.send();
            function response(e) {
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(this.response);
                urls[index].url = imageUrl
                downloads[index].state = true
                setDownloadpercent(0 + '%')
            }
        } else {
            alert('Only one download at a time is allowed')
        }


    }
    const canceldownload = (img) => {
        var index = downloads.findIndex(({ id }) => id === img._id);
        xhr.abort();
        downloads[index].state = false
    }

    ////////////////////////////////////////////////////////////////////////////////////////

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
                                        dialogues.content === "img" ?
                                            download === true ?
                                                <img className="open-img-news" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={`${plink}${dialogues.statement}`} onClick={() => { openimg(dialogues.statement) }} />
                                                :
                                                <button className="open-img-new" onClick={() => setDownload(true)}> &nbsp; &nbsp;  &nbsp; Click to &nbsp; &nbsp; &nbsp; Download Image</button>
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
                                        dialogues.content === "img" ?
                                            download === true ?
                                                <img className="open-img-new" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={`${plink}${dialogues.statement}`} onClick={() => { openimg(dialogues.statement) }} />
                                                :
                                                <button className="open-img-news" onClick={() => setDownload(true)}> &nbsp; &nbsp;  &nbsp; Click to &nbsp; &nbsp; &nbsp; Download Image</button>
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
                                        dialogues.content === "image" ?
                                            <>
                                                {
                                                    downloads[downloads.findIndex(({ id }) => id === dialogues._id)].state === true ?
                                                        <img className="open-img-new" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={urls[urls.findIndex(({ id }) => id === dialogues._id)].url} onClick={() => { openimg(dialogues.statement) }} />
                                                        :
                                                        downloads[downloads.findIndex(({ id }) => id === dialogues._id)].show === '' ?
                                                            <a className="open-img-news" onClick={() => downloadNow(dialogues)}><img src={downloadPersonal}></img></a>
                                                            :
                                                            <>
                                                                <a className="open-img-newz" onClick={() => downloadNow(dialogues)}><img onClick={() => canceldownload(dialogues)} src={gross}></img>{downloadpercent}</a>
                                                            </>

                                                }
                                            </>
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
                                        dialogues.content === "image" ?
                                            <>
                                                {
                                                    downloads[downloads.findIndex(({ id }) => id === dialogues._id)].state === true ?
                                                        <img className="open-img-new" style={{ borderRadius: '1rem', height: '22rem', backgroundColor: 'white' }} src={urls[urls.findIndex(({ id }) => id === dialogues._id)].url} onClick={() => { openimg(dialogues.statement) }} />
                                                        :
                                                        downloads[downloads.findIndex(({ id }) => id === dialogues._id)].show === '' ?
                                                            <a className="open-img-news" onClick={() => downloadNow(dialogues)}><img src={downloadPersonal}></img></a>
                                                            :
                                                            <>
                                                                <a className="open-img-newz" onClick={() => downloadNow(dialogues)}><img onClick={() => canceldownload(dialogues)} src={gross}></img>{downloadpercent}</a>
                                                            </>

                                                }
                                            </>
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
    useEffect(() => {
    }, [dialogues])
    mapfxn()

    useEffect(() => {
        if (progress === 100) {
            setProgress(null)
        }
    }, [progress])

    return (
        <>
            <div style={progress ? { display: 'block' } : { display: 'none' }} className="progress-bar">
                <div className="progress">
                    <h2>Uploading</h2>
                    <h1>{progress} %</h1>
                </div>
            </div>
            {activation === true ?
                <>
                    <div className="Dquery-main deactivate-dis">

                        <div id="scrollchat" className="query-one lkjhg">
                            {cont}
                        </div>
                        <div className="query-last">
                            <div className="query-chat">
                                <div className="pins" onClick={() => { newchange() }} ><img src={pins} /></div>
                                <input type="text" id="inputfield" onKeyPress={(e) => { (e.key === 'Enter' ? submitchat() : null) }} value={chat} onChange={(e) => { setChat(e.target.value) }}></input>
                                <div className="senda" onClick={() => { submitchat() }}><img src={Send} /></div>
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
                        <div className="videopage-gap"></div>
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
                        <div >
                            <div style={hidimg} className="MOB-img-upload" >
                                <div className="MOB-img-cont">
                                    <form method="post" enctype="multipart/form-data">
                                        <input type="file" onChange={(e) => { setImig(e.target.files[0]) }} name="image"></input>
                                        <button onClick={(e) => { handleimgupload(e); handleimg() }}>upload</button>
                                    </form>
                                    <img onClick={() => { handleimg() }} src={cross}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                    <>
                        <div className="courses-page">
                            <div className="videopage-gap"></div>
                            <h3>No Course Purchased Yet to activate this section.<br/> Quickly Go to the Pricing page and purchase the course</h3>
                        </div>
                    </>
            }
        </>
    )
}

export default Query