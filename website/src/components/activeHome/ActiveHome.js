import React, { useContext } from 'react';
import Stat from './Stat';
import lg1 from './video.png';
import lg2 from './bok.png';
import lg3 from './mat.png';
import './comman.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileContext from '../../context/profile/ProfileContext';

function ActiveHome() {

    const clink = process.env.REACT_APP_LINK;
    const profile = useContext(ProfileContext);
    const [form, setForm] = React.useState(false)
    const navigate = useNavigate();
    const [id,setId] = React.useState(null)

    React.useEffect(() => {

        setId(profile.profile.id)
        
        if (id) {     
            axios.post(`${clink}/get-form-info`,  {id:id} ).then((response) => {
                if (response.data.status === 'yes') {
                    setForm(true)
                }
                else if (response.data.status === 'no') {
                    setForm(false)
                } else {
                    alert('Something went wrong')
                }
            })
        }

    }, [profile, id])

    const handleRepo = () => {
// if (form) {
    navigate('/task')
// }
// else{
//     alert('Fill the Form so that we can generate the Weekly task according to your needs')
// }
    }

    return (
        <>
            <div className="videopage-gap"></div>

            <div className="AH-one">
                <h2>RankBoost</h2>
                <h3>Your Personal mentor and life saver</h3>

                <div className="AH-one-cont">
                    <div className="AH-one-cont-element" onClick={() => navigate('/player')}>
                        <img src={lg1} />
                        <h1>Videos</h1>
                    </div>
                    <div className="AH-one-cont-element" onClick={() => navigate('/material')}>
                        <img src={lg2} />
                        <h1>Study Material</h1>
                    </div>
                    <div className="AH-one-cont-element" onClick={() => handleRepo()}>
                        {/* <h6></h6> */}
                        <img style={{ position: 'relative', bottom: '0rem' }} src={lg3} />
                        <h1 style={{ position: 'relative', bottom: '0rem' }}>Weekly Task</h1>
                    </div>
                </div>
            </div>

            {
                form ?
                    ''
                    :
                    <div className="AH-two-form">
                        <h2>Fill the Form</h2>
                        <h3>Tell us about yourself, so that we can can properly guide you and customize the course according to your prepration level</h3>
                        <button onClick={() => navigate('/course-form')} >Open the Form</button>
                    </div>
            }

            {/* <Stat /> */}

        </>
    )
}

export default ActiveHome