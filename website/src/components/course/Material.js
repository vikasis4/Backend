import axios from 'axios';
import './card.css'
import React, { useContext, useEffect, useState } from 'react'
import ProfileContext from '../../context/profile/ProfileContext'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'


const Material = (props) => {

    const { footer } = props
    const profile = useContext(ProfileContext)
    const [jankari, setJankari] = useState([])
    const clink = process.env.REACT_APP_LINK
    const vlink = process.env.REACT_APP_VIDEO_LINK
    const [bar, setBar] = useState('one');
    const [plf, setPlf] = useState([]);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)



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
        console.log(clink + '/pyq/get');
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
    },[jankari, plf])
    var peliment = ''
    var celiment = ''
    var meliment = ''
    var deliment = ''
    var zeliment = ''

    if (plf.length > 0) {
        const bubble = (jankari) => {
            profile.setPdfurl(`${vlink}/pyq/${jankari.bname}.pdf`)
            navigate('/viewpdf')
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
                                <button onClick={() => subble()}>view pdf</button>
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
                                <button onClick={() => subble()}>view pdf</button>
                            </div>
                        </>
                    )
                }
            }
        )
    }

    if (jankari.length > 0) {
        
        const bubble = (jankari) => {
            profile.setPdfurl(`${vlink}/material/${jankari.type}/${jankari.bname}.pdf`)
            navigate('/viewpdf')
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
                                <button onClick={() => subble()}>view pdf</button>
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
                                <button onClick={() => subble()}>view pdf</button>
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
                                <button onClick={() => subble()}>view pdf</button>
                            </div>
                        </>
                    )
                }
            }
        )
    }

    /////////////////////////////////////////////////////////////////////////////////////////

    const toggleR = (jsx) => {

        setBar(jsx)

        if (jsx === 'two') {

            document.getElementById('mat-ones').style.transform = 'translateY(-10px)';
            document.getElementById('mat-twos').style.transform = 'translateY(0px)';
            document.getElementById('mat-three').style.transform = 'translateY(0px)';
        }
        else if (jsx === 'one') {

            document.getElementById('mat-ones').style.transform = 'translateY(0px)';
            document.getElementById('mat-twos').style.transform = 'translateY(-10px)';
            document.getElementById('mat-three').style.transform = 'translateY(0px)';
        }
        else if (jsx === 'three') {

            document.getElementById('mat-ones').style.transform = 'translateY(0px)';
            document.getElementById('mat-twos').style.transform = 'translateY(0px)';
            document.getElementById('mat-three').style.transform = 'translateY(-10px)';
        }
    }

    return (
        <>
            <div className="material-main">
                <Helmet>
                    <title>RankBoost - Study material</title>
                    <meta name="keywords" content="RankBoost study material guidance mentorship iit jee" />
                    <meta name="description" content="Check our quality rankboost study material" />
                </Helmet>

                <h1 className="bugasuga">{bar === 'one' ? 'Notes' : bar === 'two' ? 'Pyq' : 'Mind Maps'}</h1>

                <div className="videopage-material">
                    <div onClick={() => toggleR('one')} id="mat-twos" className="videopage-mat-one plokid">
                        <div className="mat-text"><h1>Notes</h1></div>
                    </div>
                    <div onClick={() => toggleR('two')} id="mat-ones" className="videopage-mat-one plokod">
                        <div className="mat-text"><h1>Pyq</h1></div>
                    </div>
                    <div onClick={() => toggleR('three')} id="mat-three" className="videopage-mat-one plokod">
                        <div className="mat-text"><h1>Mind maps</h1></div>
                    </div>
                </div>

                {
                    bar === 'two' ?
                        <div className="material-cont">

                            <div className="material-body">
                                {loader === true ? <h1>Loading...</h1> : deliment}
                            </div>
                        </div>
                        :
                        bar === 'three' ?
                            <>
                                <div className="material-cont">

                                    <div className="material-body">
                                    {loader === true ? <h1>Loading...</h1> : zeliment}
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="material-cont">
                                    <div style={{ marginTop: '12rem' }} className="material-head">
                                        <h1>physics</h1>
                                    </div>
                                    <div className="material-body">
                                    {loader === true ? <h1>Loading...</h1> : peliment}

                                    </div>
                                </div>
                                <div className="material-cont">
                                    <div className="material-head">
                                        <h1>chemistry</h1>
                                    </div>
                                    <div className="material-body">
                                    {loader === true ? <h1>Loading...</h1> : celiment}
                                    </div>
                                </div>
                                <div className="material-cont">
                                    <div className="material-head">
                                        <h1>maths</h1>
                                    </div>
                                    <div className="material-body">
                                    {loader === true ? <h1>Loading...</h1> : meliment}
                                    </div>
                                </div>
                            </>
                }

            </div>
            {footer}

        </>
    )
}

export default Material