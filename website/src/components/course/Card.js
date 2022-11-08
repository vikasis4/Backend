import React, { useContext, useState } from 'react'
import './card.css'
import Profile from '../../svg/Profile'
import ProfileContext from '../../context/profile/ProfileContext'
import CourseContext from '../../context/course/CourseContext'
import VerifyContext from '../../context/verify/VerifyContext'
import { useNavigate } from 'react-router-dom'

const card = (props) => {

    const navigate = useNavigate();


    const info = useContext(ProfileContext);
    const state = useContext(CourseContext);
    const [update, setUpdate] = useState('');
    const verify = useContext(VerifyContext);
    const { card } = props;
    const clink = process.env.REACT_APP_LINK;
    const vlink = process.env.REACT_APP_VIDEO_LINK;

    const vimeo = async () => {
        info.setDisp('block')
        
        if (info.profile.subscription === 'true' && localStorage.getItem('token')) {
            state.update({ bname:card.bname, name: card.name, category: card.category, id: info.profile.id})
            await verify.Runverify();
            navigate('/player')
            verify.setProgress(100)
            info.setDisp('none')
        } else {
            setUpdate('yes')
            setTimeout(() => {
                setUpdate('')
            }, 2000);
        }

    }

    var thumblink = vlink+`/course/${card.category}/${card.bname}/image.jpg`

    return (
        <>
            <div className="card-flex">
                <div className="card-main" style={{ background: `url(${thumblink})` }}>
                    <div className="card-cont">
                        <div className="card-one">
                            <h1>{card.name}</h1>
                        </div>
                        <div className="card-two">
                            <a onClick={vimeo} >
                                <Profile />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="card-flex-two">
                    <h1>* {card.name}</h1>
                    <h1>* {card.minutes} Mins {card.seconds} Seconds</h1>
                </div>
            </div>

        </>
    )
}

export default card