import './card.css'
import React from 'react'
import ProfileContext from '../../context/profile/ProfileContext';
import { useNavigate } from 'react-router-dom';

const Material = () => {

    const profile = React.useContext(ProfileContext)
    const navigate = useNavigate()
    
    const toggleR = (jsx) => {
        profile.setMat(jsx);
        navigate('/paper')
    }

    return (
        <>
            <div className="material-main">
              
                <div className="videopage-material">
                    <div onClick={() => toggleR('one')} id="mat-twos" className="videopage-mat-one plokid">
                        <div className="mat-text"><img src={require('./icons/physics.png')} /><h1 >Physics Notes</h1></div>
                    </div>
                    <div onClick={() => toggleR('two')} id="mat-twos" className="videopage-mat-one plokid">
                        <div className="mat-text"><img src={require('./icons/chemistry.png')} /><h1 >Chemistry Notes</h1></div>
                    </div>
                    <div onClick={() => toggleR('three')} id="mat-twos" className="videopage-mat-one plokid">
                        <div className="mat-text"><img src={require('./icons/mathspng.png')} /><h1 >Maths Notes</h1></div>
                    </div>
                    <div onClick={() => toggleR('four')} id="mat-ones" className="videopage-mat-one plokod">
                        <div className="mat-text"><img src={require('./icons/paper.png')} /><h1 >PYQ</h1></div>
                    </div>
                    <div onClick={() => toggleR('five')} id="mat-ones" className="videopage-mat-one plokod">
                        <div className="mat-text"><img src={require('./icons/paper.png')} /><h1 >2023 Jan Attempt All PYQ</h1></div>
                    </div>
                    <div onClick={() => toggleR('six')} id="mat-three" className="videopage-mat-one plokod">
                        <div className="mat-text"><img src={require('./icons/brain.png')} /><h1 >Mind Maps</h1></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Material