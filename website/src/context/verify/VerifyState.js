import React from 'react'
import VerifyContext from './VerifyContext';
import { useContext, useState } from 'react'
import axios from 'axios';
import ProfileContext from '../profile/ProfileContext'


const VerifyState = (props) => {


    const datas = useContext(ProfileContext);
    const [verify, setVerify] = useState('');
    const [progress, setProgress] = useState('');
    const clink = process.env.REACT_APP_LINK;
    var cu_obj = {
        name: 'Mistakes to avoid in JEE preparation',
        bname: 'video1',
        category: 't1'
    }
    var quality = 480


    const Runverify = async (name) => {

        ////////////////////// video setting //////////////////////
        if (localStorage.getItem('cu_name')) {
            cu_obj = {
                name: localStorage.getItem('cu_name'),
                bname: localStorage.getItem('cu_bname'),
                category: localStorage.getItem('cu_cat')
            }
        }
        if (localStorage.getItem('quality')) {
            quality = localStorage.getItem('quality')
        }
        ////////////////////// video setting //////////////////////

        if (progress < 40) {
            setProgress(10)
        }

        if (localStorage.getItem('token')) {
            await axios.get(clink + "/verifyuser", {
                headers: { 'auth-token': localStorage.getItem('token') }
            }).then(function (response) {

                if (response.data.message === 'success') {
                    setProgress(60)
                    var type = 'normal';
                    if (response.data.user.refral === 'empty') {
                        type = 'normal'
                    } else {
                        type = 'refral'
                    }
                    datas.setProfile({
                        username: response.data.user.username,
                        subscription: response.data.user.subscription,
                        void: 'no',
                        id: response.data.user._id,
                        current: cu_obj,
                        query: response.data.user.query,
                        img: response.data.user.img,
                        vkey: response.data.user.vkey,
                        name: response.data.user.name,
                        quality: quality,
                        subarray: response.data.user.subarray,
                        type,
                        room: response.data.user.room,
                        cart: response.data.user.cart,
                    });
                    if (response.data.user.subscription === 'true') {
                        setVerify('thanks')
                    } else {
                        setVerify('true')
                    }
                    localStorage.setItem('reload-facility', '89307988vikasREF')
                    datas.setDisp('none')
                    datas.setDispmessage('Loading')
                }
                else if (response.data.message === 'tokenExpired') {
                    localStorage.removeItem('token')
                    setVerify('false')
                    alert('You can login to 2 devices only. Login again to use your account on this device and the last logged in device will be logged out')
                    datas.setDisp('none')
                    datas.setDispmessage('Loading')
                }
                else if (response.data.message === 'nouser') {
                    localStorage.removeItem('token')
                    setVerify('false')
                    datas.setDisp('none')
                    datas.setDispmessage('Loading')
                }
                else if (response.data.message === 'fail') {
                    localStorage.removeItem('token')
                    setVerify('false')
                    datas.setDisp('none')
                    datas.setDispmessage('Loading')
                }
            })
            if (name === '/') {
                setTimeout(() => {
                    setProgress(100)
                }, 1000)
            } else {
                setProgress(50)
            }

        } else {
            setTimeout(() => {
                setProgress(100)
            }, 1000)
            setVerify("false")
        }
    }



    return (
        <VerifyContext.Provider value={{ Runverify, verify, progress, setProgress }} >
            {props.children}
        </VerifyContext.Provider>
    )
}
export default VerifyState;