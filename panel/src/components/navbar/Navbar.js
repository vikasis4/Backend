import React, { useContext, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import './navbar.css'
import PanelContext from '../../context/panelentry/PanelContext'

const Navbar = () => {
    const navigate = useNavigate();
    const panel = useContext(PanelContext)
    useEffect(() => {
        window.onbeforeunload = function () {
            navigate('/')
        };
    }, [])

    return (
        <>
            <div className="navbar-main">
                <div className="navbar-main-one">
                    <h1>Rank boost - Control panel</h1>
                </div>
                <div className="navbar-main-two">
                    <div className="navbar-main-left">
                        <ul className="navbar-ul">
                            {
                                panel.verify === true ? <>
                                    <li><button onClick={() => { navigate('/') }} className="btn">Dashboard</button></li>
                                    <li><button onClick={() => { navigate('/query') }} className="btn">Query</button></li>
                                    <li><button onClick={() => { navigate('/personal') }} className="btn">User_Info</button></li>
                                    <li><button onClick={() => { navigate('/payment') }} className="btn">Transactions</button></li>
                                    <li><button onClick={() => { navigate('/video') }} className="btn">Video / Pdf</button></li>
                                    <li><button onClick={() => { navigate('/blogs') }} className="btn">Users</button></li>
                                    <li><button onClick={() => { navigate('/variable') }} className="btn">Dynamics</button></li>
                                    <li><button onClick={() => { localStorage.removeItem('authinfo'); panel.setVerify(false); navigate('/') }} className="btn">Log out</button></li>
                                </>
                                    :
                                    <>
                                        <li><button disabled  className="btn">Home</button></li>
                                        <li><button disabled  className="btn">Query</button></li>
                                        <li><button disabled  className="btn">User_info</button></li>
                                        <li><button disabled  className="btn">Transactions</button></li>
                                        <li><button disabled  className="btn">Video / Pdf</button></li>
                                        <li><button disabled  className="btn">Users</button></li>
                                        <li><button disabled className="btn">Dynamics</button></li>
                                        <li><button disabled  className="btn">Log out</button></li>
                                    </>
                            }
                        </ul>
                    </div>
                    <div className="navbar-main-right">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar