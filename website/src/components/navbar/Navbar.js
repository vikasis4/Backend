import "./navbar.css"
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import React, { useContext, useState, useEffect } from 'react'
import ProfileContext from '../../context/profile/ProfileContext'
import VerifyContext from '../../context/verify/VerifyContext'
import LoadingBar from 'react-top-loading-bar'
import cross from '../../svg/cross.svg'
import menu from '../../svg/menud.svg'
import user from './user.png'
import Gif from '../homePageLO/Gif.gif'
// import ico from '../support/favicon.ico'
import ico from '../support/favicon.ico'
import mhome from '../../svg/mhome.svg'
import mkey from '../../svg/mkey.svg'
import mprice from '../../svg/mprice.svg'
import mrefer from '../../svg/mrefer.svg'
import mright from '../../svg/mright.svg'
import msupport from '../../svg/msupport.svg'
import mcourse from '../../svg/mcourse.svg'
import mdoubt from '../../svg/mdoubt.svg'
import mbook from '../../svg/mbook.svg'
import macc from '../../svg/macc.svg'
import myoutube from '../../svg/myoutube.svg'
import mblog from '../../svg/mblog.svg'
import cart from '../../svg/cart.svg'
import dottedmenu from '../../svg/dottedmenu.svg'




const Navbar = () => {
    var wid = window.innerWidth + 'px'
    var hoe = window.innerHeight + 'px'

    const manage = useContext(ProfileContext);
    const loader = useContext(VerifyContext);
    const dispi = manage.disp;
    const [cartlength, setCartlength] = useState(0);

    useEffect(() => {
        setCartlength(manage.profile.cart.length);;
    }, [manage])

    useEffect(() => {
        document.getElementById('loader-display').style.display = dispi
    }, [dispi])
    const navigate = useNavigate();
    const location = useLocation();

    var loginp = () => {
        navigate('/login')
    }
    var homego = () => {
        navigate('/')
    }

    const profilepage = () => {
        navigate('/profile')
    }
    const blogs = () => {
        navigate('/blogs')
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [url, setUrl] = useState(cart)

    ////////////////////////////////////////////////////////////////////////////////

    const [value, setValue] = useState('no');
    const [trans, setTrans] = useState({
        transform: 'translateX(-100%)'
    })
    const show = () => {
        if (value === 'yes') {
            setValue('no');
            setTrans({
                transform: 'translateX(-100%)'
            })
        } else {
            setValue('yes')
            setTrans({
                transform: 'translateX(0%)'
            })
        }
    }

    return (
        <>


            <div className='mobile-offer-top activate-dis'>
                <ul>
                    <li>Made by IITIANs and Top Coaches</li>
                    <li>A Quality product by RankBoost</li>
                    <li>India's Best Mentorship platform</li>
                </ul>
            </div>
            <div id="navbar-main"
                className="navbar-main" >
                <LoadingBar
                    color='var(--s1)'
                    height={2}
                    progress={loader.progress}
                    onLoaderFinished={() => loader.setProgress(0)}
                />
                <div id="loader-display">
                    <div style={{ width: wid, height: hoe }} className='loading-io'><div><img src={Gif}></img>
                    </div>
                        <h1>{manage.dispmessage}</h1>
                    </div>
                </div>
                <div id="navbar-pehla" onClick={() => { show() }} className="navbar-pehla">
                    <a > <img src={menu} /></a>
                </div>

                <div id="navbar-first" className="navbar-first" >
                    <img src={ico}></img> <a onClick={homego} >Rank boost</a>
                </div>
                <div id="navbar-second" className="navbar-second">
                    <ul>
                        <li><a style={location.pathname === '/' ? { color: 'var(--s2)' } : { color: 'var(--c1)', borderColor: 'var(--c1)' }} onClick={homego} >Home</a></li>

                        {manage.profile.subscription === 'true' ?
                            <li><a style={location.pathname === '/price' ? { color: 'var(--s2)', } : { color: 'var(--c1)', borderColor: 'var(--c1)' }} onClick={() => { navigate('/price') }}>Your courses</a></li>
                            :
                            <li><a style={location.pathname === '/price' ? { color: 'var(--s2)', } : { color: 'var(--c1)', borderColor: 'var(--c1)' }} onClick={() => { navigate('/price') }}>Pricing</a></li>
                        }


                        <li><a style={location.pathname === '/refral' ? { color: 'var(--s2)', } : { color: 'var(--c1)', borderColor: 'var(--c1)' }} onClick={() => { navigate('/refral') }}>Referral</a></li>
                        <li><a style={location.pathname === '/books' ? { color: 'var(--s2)', } : { color: 'var(--c1)', borderColor: 'var(--c1)' }} onClick={() => { navigate('/books') }}>Books</a></li>
                        {/* <li><a style={location.pathname === '/guidance-personal' ? { color: 'var(--s2)', } : { color: 'var(--c1)', borderColor: 'var(--c1)' }} onClick={() => { navigate('/guidance-personal') }}>Personal 1-1 guidance</a></li> */}
                        <li><a style={location.pathname === '/support' ? { color: 'var(--s2)', } : { color: 'var(--c1)', borderColor: 'var(--c1)' }} onClick={() => { navigate('/support') }}>Customer support</a></li>
                        <li><a onClick={() => { navigate("/checkout") }}><p>{cartlength}</p><img src={cart}></img></a></li>
                    </ul>
                </div>
                <div id="navbar-third" className="navbar-third">
                    {
                        window.innerWidth < 480 ?
                            manage.profile.void === 'no' ?
                                <>
                                    <a className="navbar-cart" onClick={() => { navigate("/checkout") }}><p >{cartlength}</p><img src={url}></img></a>
                                    <h6 onClick={profilepage} id="no-acc">Account</h6>
                                </>
                                :
                                location.pathname === '/login' ?
                                    <>
                                        <a className="navbar-cart" onClick={() => { navigate("/checkout") }}><p >{cartlength}</p><img src={url}></img></a>
                                        <button className="navbar-third-btn" onClick={() => { navigate("/register") }}>Register</button>
                                    </>
                                    :
                                    <>
                                        <a className="navbar-cart" onClick={() => { navigate("/checkout") }}><p >{cartlength}</p><img src={url}></img></a>
                                        <button className="navbar-third-btn" onClick={loginp}>Login</button>
                                    </>
                            :
                            manage.profile.void === 'no' ?
                                manage.profile.img === 'empty' ? <h1 onClick={profilepage} id="no-pfp">{manage.profile.username.slice(0, 1)}</h1> : <img onClick={profilepage} id="pfp" src={manage.profile.img}></img>
                                :
                                <button style={location.pathname === '/login' || location.pathname === 'register' ? { backgroundColor: 'var(--s3)' } : { backgroundColor: 'var(--c2)' }} className="navbar-third-btn" onClick={loginp}>Login</button>
                    }
                </div>
            </div>

            {
                value === 'yes' ?
                    <div onClick={() => { show() }} className="menu-blur"></div>
                    :
                    ''
            }
            <div id="navbar-sab" style={trans} className="navbar-sab">
                <div className="navbar-menu-one">
                    <div className="navbar-men-one">
                        <img src={manage.profile.img === '' || manage.profile.img === 'empty' ? user : manage.profile.img}></img>
                        <div>
                            <h1>{manage.profile.void === 'no' ? manage.profile.name : "Username"}</h1>
                            <h2>Course :- {manage.profile.subscription === 'false' || manage.profile.subscription === '' ? "Inactive" : "Active"}</h2>
                        </div>
                    </div>
                    <img onClick={() => { show() }} src={cross}></img>
                </div>
                <div className="menu-bhai">
                    <ul>
                        <li onClick={() => { navigate('/'); show(); }}> <div className="menu-bros" ><img className="menu-icos" src={mhome} ></img> <a>Home</a></div><img src={mright}></img></li>
                        <li onClick={() => { navigate('/courses'); show(); }}> <div className="menu-bros" ><img className="menu-icos" src={mcourse} ></img> <a>Active Courses</a></div><img src={mright}></img></li>
                        <li onClick={() => { navigate('/price'); show(); }}> <div className="menu-bros" ><img className="menu-icos" src={mprice} ></img> <a>Pricing</a></div><img src={mright}></img></li>
                        <li onClick={() => { navigate('/refral'); show(); }}> <div className="menu-bros" ><img className="menu-icos" src={mrefer} ></img> <a >Referral</a></div><img src={mright}></img></li>
                        <li onClick={() => { navigate('/books'); show(); }}> <div className="menu-bros" ><img className="menu-icos" src={mbook} ></img> <a >Books</a></div><img src={mright}></img></li>
                        {/* <li onClick={() => { navigate('/guidance-personal'); show(); }}> <div className="menu-bros" ><img className="menu-icos" src={mdoubt} ></img> <a>Personal 1-1 guidance</a></div><img src={mright}></img></li> */}
                        <li onClick={() => { navigate('/forgot'); show(); }}> <div className="menu-bros" ><img className="menu-icos" src={mkey} ></img> <a >Change &nbsp; password</a></div><img src={mright}></img></li>
                        <li onClick={() => { navigate('/support'); show(); }}> <div className="menu-bros" ><img className="menu-icos" src={msupport} ></img> <a >Customer &nbsp; support</a></div><img src={mright}></img></li>
                    </ul>
                    <div className="menu-last">
                        <div className="menu-last-dik">
                            <img onClick={() => { navigate('/blogs'); show(); }} src={mblog}></img>
                            <h1>Blogs</h1>
                        </div>
                        <div className="menu-last-dik">
                            <img onClick={() => { window.open('https://youtube.com/c/RanKBoosTsShubhamKumar') }} src={myoutube}></img>
                            <h1>Youtube</h1>
                        </div>
                        <div className="menu-last-dik">
                            <img onClick={() => { manage.profile.void === 'no' ? navigate('/profile') : navigate('/register'); show(); }} src={macc}></img>
                            <h1>Account</h1>
                        </div>
                    </div>
                </div>
            </div>


            {
                location.pathname === '/player' ?
                    ""
                    :
                    <div className="activate-dis">
                        <div className="bottom-menu">
                            <div onClick={() => { navigate('/refral') }} className="bottom-menu-comman">
                                <img src={mrefer}></img>
                                <h1>Refer to Earn</h1>
                            </div>
                            <div onClick={() => { navigate('/books') }} className="bottom-menu-comman">
                                <img src={mbook}></img>
                                <h1>Books</h1>
                            </div>

                            <div onClick={() => { show() }} className="bottom-menu-center">
                                <img src={dottedmenu}></img>
                            </div>
                            <div onClick={() => { navigate('/price') }} className="bottom-menu-comman">
                                <img src={mprice}></img>
                                <h1>Price</h1>
                            </div>
                            <div onClick={() => { navigate('/courses') }} className="bottom-menu-comman">
                                <img src={mcourse}></img>
                                <h1>courses</h1>
                            </div>
                        </div>
                    </div>
            }

            <Outlet />
            <div className="special-gappers"></div>
        </>
    )
}

export default Navbar;