import axios from 'axios';
import './card.css'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const Material = (props) => {

    const { footer } = props
    const [jankari, setJankari] = useState([])
    const clink = process.env.REACT_APP_LINK
    const vlink = process.env.REACT_APP_VIDEO_LINK
    const [bar, setBar] = useState('one');
    const [plf, setPlf] = useState([]);
    const [sub, setSub] = useState('phy');
    const [pbk, setPbk] = useState(0);
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
                                <button onClick={() => subble()}>Download Pdf</button>
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
                                <button onClick={() => subble()}>Download Pdf</button>
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
                                <button onClick={() => subble()}>Download Pdf</button>
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
                                <button onClick={() => subble()}>Download Pdf</button>
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
                                <button onClick={() => subble()}>Download Pdf</button>
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
                                <button onClick={() => subble()}>Download Pdf</button>
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
    }
    const ONobj = {
        color: 'black',
        borderBottom: '3px solid black'
    }
    const OFFobj = {
        color: 'white',
    }

    return (
        <>
            <div className="material-main">
                <Helmet>
                    <title>RankBoost - Study material</title>
                    <meta name="keywords" content="RankBoost study material guidance mentorship iit jee" />
                    <meta name="description" content="Check our quality rankboost study material" />
                </Helmet>


                <div className="videopage-material">
                    <div onClick={() => toggleR('one')} id="mat-twos" className="videopage-mat-one plokid">
                        <div className="mat-text"><h1 style={bar === 'one' ? ONobj : OFFobj}>Notes</h1></div>
                    </div>
                    <div onClick={() => toggleR('two')} id="mat-ones" className="videopage-mat-one plokod">
                        <div className="mat-text"><h1 style={bar === 'two' ? ONobj : OFFobj}>PYQ</h1></div>
                    </div>
                    <div onClick={() => toggleR('three')} id="mat-three" className="videopage-mat-one plokod">
                        <div className="mat-text"><h1 style={bar === 'three' ? ONobj : OFFobj}>Mind Maps</h1></div>
                    </div>
                </div>

                {
                    bar === 'two' ?
                        <div className="material-cont">

                                <div className="material-head">
                                    <h1 onClick={() => setPbk(0)} style={pbk === 0 ? ONobj : OFFobj} >PYQ before 2022</h1>
                                    <h1 onClick={() => setPbk(1)} style={pbk === 1 ? ONobj : OFFobj}>2023 janurary shift</h1>
                                </div>
                            <div className="material-body">
                                {loader === true ? <h1>Loading...</h1> : 
                                pbk === 0 ?
                                deliment
                                :
                                keliment
                                }
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
                                    <div className="material-head">
                                        <h1 onClick={() => setSub('phy')} style={sub === 'phy' ? ONobj : OFFobj} >Physics</h1>
                                        <h1 onClick={() => setSub('chem')} style={sub === 'chem' ? ONobj : OFFobj}>Chemistry</h1>
                                        <h1 onClick={() => setSub('mth')} style={sub === 'mth' ? ONobj : OFFobj}>Maths</h1>
                                    </div>
                                    <div className="material-body">
                                        {
                                            sub === 'phy' ?
                                                loader === true ? <h1>Loading...</h1> : peliment
                                                :
                                                sub === 'chem' ?
                                                    loader === true ? <h1>Loading...</h1> : celiment
                                                    :
                                                    loader === true ? <h1>Loading...</h1> : meliment
                                        }
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