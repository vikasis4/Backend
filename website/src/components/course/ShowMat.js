import axios from 'axios';
import './card.css'
import React, { useEffect, useState } from 'react'
import ProfileContext from '../../context/profile/ProfileContext';
import { useNavigate } from 'react-router-dom';

function ShowMat() {

    const [jankari, setJankari] = useState([])
    const clink = process.env.REACT_APP_LINK
    const vlink = process.env.REACT_APP_VIDEO_LINK
    const [plf, setPlf] = useState([]);
    const profile = React.useContext(ProfileContext)
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        if (profile.profile.subscription === 'true') {
            ////
        } else {
            navigate('/')
        }
    }, [])
    useEffect(() => {
        axios.get(clink + '/get/pdf')
            .then((response) => {
                setJankari(response.data)
                if (plf.length > 0) {
                    setLoader(false)
                }
            })
    }, [])
    useEffect(() => {
        axios.get(clink + '/pyq/get')
            .then((response) => {
                setPlf(response.data);
                if (jankari.length > 0) {
                    setLoader(false)
                }
            })
    }, [])
    useEffect(() => {
        if (jankari.length > 0 && plf.length > 0) {
            setLoader(false)
        }
    }, [jankari, plf])
    var peliment = ''
    var celiment = ''
    var meliment = ''
    var deliment = ''
    var keliment = ''
    var zeliment = ''

    if (plf.length > 0) {
        const bubble = (jankari) => {
            if (screen.width < 480) {
                alert('Downloading has started, Check the Download section of browser')
            }
            window.open(`${vlink}/pyq/${jankari.bname}.pdf`, "_self")
        }
        deliment = (plf).map(
            (plf) => {
                const subble = () => {
                    bubble(plf)
                }
                if (plf.type === 'pyq') {
                    return (
                        <>
                            <div className="mat-one">
                                <div><h1>{plf.name}</h1></div>
                                <img onClick={() => subble()} src={require('./icons/download.png')} />
                            </div>
                        </>
                    )
                }
            }
        )
        keliment = (plf).map(
            (plf) => {
                const subble = () => {
                    bubble(plf)
                }
                if (plf.type === 'jan') {
                    return (
                        <>
                            <div className="mat-one">
                                <div><h1>{plf.name}</h1></div>
                                <img onClick={() => subble()} src={require('./icons/download.png')} />
                            </div>
                        </>
                    )
                }
            }
        )
        zeliment = (plf).map(
            (plf) => {
                const subble = () => {
                    bubble(plf)
                }
                if (plf.type === 'mid') {
                    return (
                        <>
                            <div className="mat-one">
                                <div><h1>{plf.name}</h1></div>
                                <img onClick={() => subble()} src={require('./icons/download.png')} />
                            </div>
                        </>
                    )
                }
            }
        )
    }

    if (jankari.length > 0) {

        const bubble = (jankari) => {
            if (screen.width < 480) {
                alert('Downloading has started, Check the Download section of browser')
            }
            window.open(`${vlink}/material/${jankari.type}/${jankari.bname}.pdf`, "_self")
        }

        peliment = (jankari).map(
            (jankari) => {
                const subble = () => {
                    bubble(jankari)
                }
                if (jankari.type === 'p') {
                    return (
                        <>
                            <div className="mat-one">
                                <div><h1>{jankari.name}</h1></div>
                                <img onClick={() => subble()} src={require('./icons/download.png')} />
                            </div>
                        </>
                    )
                }
            }
        )
        celiment = (jankari).map(
            (jankari) => {
                const subble = () => {
                    bubble(jankari)
                }
                if (jankari.type === 'c') {
                    return (
                        <>
                            <div className="mat-one">
                                <div><h1>{jankari.name}</h1></div>
                                <img onClick={() => subble()} src={require('./icons/download.png')} />
                            </div>
                        </>
                    )
                }
            }
        )
        meliment = (jankari).map(
            (jankari) => {
                const subble = () => {
                    bubble(jankari)
                }
                if (jankari.type === 'm') {
                    return (
                        <>
                            <div className="mat-one">
                                <div><h1>{jankari.name}</h1></div>
                                <img onClick={() => subble()} src={require('./icons/download.png')} />
                            </div>
                        </>
                    )
                }
            }
        )
    }

    return (
        <>
            <div className="videopage-gap"></div>
            <div className="videopage-head-txt">
                {
                    profile.mat === 'one' ?
                        <>
                            <h6>Physics Notes</h6>
                            {peliment}
                        </>
                        :
                        profile.mat === 'two' ?
                            <>
                                <h6>Chemistry Notes</h6>
                                {celiment}
                            </>
                            :
                            profile.mat === 'three' ?
                                <>
                                    <h6>Maths Notes</h6>
                                    {meliment}
                                </>
                                :
                                profile.mat === 'four' ?
                                    <>
                                        <h6>PYQ</h6>
                                        {deliment}
                                    </>
                                    :
                                    profile.mat === 'five' ?
                                        <>
                                            <h6>Jan Shift 2023 All PYQ</h6>
                                            {keliment}
                                        </>
                                        :
                                        <>
                                            <h6>Mind Maps</h6>
                                            {zeliment}
                                        </>
                }
            </div>
        </>
    )
}

export default ShowMat