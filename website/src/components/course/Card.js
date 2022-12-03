import React, { useContext, useState } from 'react'
import './card.css'
import ProfileContext from '../../context/profile/ProfileContext'
import CourseContext from '../../context/course/CourseContext'

const card = (props) => {

    const info = useContext(ProfileContext);
    const state = useContext(CourseContext);
    const style = {background: 'var(--s3)'};
    const { card, nig } = props;

    const vimeo = async () => {        
        if (info.profile.subscription === 'true' && localStorage.getItem('token')) {
            info.setProfile({
                ...info.profile,
                current:
                {bname:card.bname, name: card.name, category: card.category}
            })
            state.update({bname:card.bname, name: card.name, category: card.category, id: info.profile.id})
        }
    }
    return (
        <>
            <div style={card.name === info.profile.current.name ? style : {}} onClick={ ()=> vimeo()} className="card-flex">
                    <h1>{nig})</h1>
                    <h1>{card.name}</h1>
            </div>

        </>
    )
}

export default card