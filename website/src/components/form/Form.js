import React, { useState, useContext } from 'react'
import './form.css'
import axios from 'axios'
import ProfileContext from '../../context/profile/ProfileContext'
import { Navigate } from 'react-router-dom'

function Form() {

    const style = {
        border: '1px solid black',
        borderRadius: '8px',
        padding: '4px',
    }
    const profile = useContext(ProfileContext);
    const [id, setId] = useState(null)

    React.useEffect(()=>{
        setId(profile.profile.id)
        console.log(profile.profile.id);
    },[profile.profile.id])
    
    const clink = process.env.REACT_APP_LINK;
    const submit = () => {
        
        setId(profile.profile.id)
        if (form.q21 === '' || form.q22 === '' || form.q3 === '' || form.q8 === ''|| form.q9 === ''|| form.q11 === ''|| form.q12 === ''|| form.q13 === ''|| form.q14 === '') {
            alert('Some Fields are Left Empty')
        }else{
            axios.post(`${clink}/course-form`, {form, men: profile.profile.id}).then((response) => {
                if (response.data.status === 'yes'){
                    alert('Form submit successfully');
                    Navigate('/course')
                }else{
                    alert('server error! Something went wrong')
                }
            })
        }
    }

    const [form, setForm] = useState({
        id,
        q1: 1,
        q21: '',
        q22: '',
        q3: '',
        q4: 2,
        q5: 2,
        q6: 2,
        q7: 1,
        q8: '',
        q9: '',
        q10: 2,
        q11: '',
        q12: '',
        q13: '',
        q14: '',
    })

    return (
        <>
            <div className="videopage-gap"></div>
            <div className='form-main'>
                <h4>Form ~ Jee Mains+Advance 2023</h4>

                <div className="form-input">
                    <h1>1 ~ What is your Mode of Prepration ?</h1>
                    <div className="form-input-ans">
                        <h2 style={form.q1 === 1 ? style : {}} onClick={() => setForm({ ...form, q1: 1 })} > Online Coaching</h2>
                        <h2 style={form.q1 === 2 ? style : {}} onClick={() => setForm({ ...form, q1: 2 })} > Offline Coaching</h2>
                        <h2 style={form.q1 === 3 ? style : {}} onClick={() => setForm({ ...form, q1: 3 })} > Self Study</h2>
                    </div>
                </div>

                <div className="form-input">
                    <h1>2 ~ How much score are you targeting ?</h1>
                    <div className="form-input-ans">
                        <input type='number' value={form.q21} onChange={(e) => setForm({ ...form, q21:  e.target.value })} placeholder='Mains Marks'></input>
                        <input type='number' value={form.q22} onChange={(e) => setForm({ ...form, q22:  e.target.value })} placeholder='Advance Marks'></input>
                    </div>
                </div>

                <div className="form-input">
                    <h1>3 ~ Enter your Phone Number.</h1>
                    <div className="form-input-ans">
                        <input type='number' value={form.q3} onChange={(e) => setForm({ ...form, q3: e.target.value })} placeholder='Phone number'></input>
                    </div>
                </div>

                <div className="form-input">
                    <h1>4 ~ What is your prepration level of Physics ?</h1>
                    <div className="form-input-ans">
                        <h2 style={form.q4 === 1 ? style : {}} onClick={() => setForm({ ...form, q4: 1 })} > Noob</h2>
                        <h2 style={form.q4 === 2 ? style : {}} onClick={() => setForm({ ...form, q4: 2 })} > Average</h2>
                        <h2 style={form.q4 === 3 ? style : {}} onClick={() => setForm({ ...form, q4: 3 })} > Above Average</h2>
                        <h2 style={form.q4 === 4 ? style : {}} onClick={() => setForm({ ...form, q4: 4 })} > Well Prepared</h2>
                    </div>
                </div>

                <div className="form-input">
                    <h1>5 ~ What is your prepration level of Chemistry ?</h1>
                    <div className="form-input-ans">
                        <h2 style={form.q5 === 1 ? style : {}} onClick={() => setForm({ ...form, q5: 1 })} > Noob</h2>
                        <h2 style={form.q5 === 2 ? style : {}} onClick={() => setForm({ ...form, q5: 2 })} > Average</h2>
                        <h2 style={form.q5 === 3 ? style : {}} onClick={() => setForm({ ...form, q5: 3 })} > Above Average</h2>
                        <h2 style={form.q5 === 4 ? style : {}} onClick={() => setForm({ ...form, q5: 4 })} > Well Prepared</h2>
                    </div>
                </div>

                <div className="form-input">
                    <h1>6 ~ What is your prepration level of Maths ?</h1>
                    <div className="form-input-ans">
                        <h2 style={form.q6 === 1 ? style : {}} onClick={() => setForm({ ...form, q6: 1 })} > Noob</h2>
                        <h2 style={form.q6 === 2 ? style : {}} onClick={() => setForm({ ...form, q6: 2 })} > Average</h2>
                        <h2 style={form.q6 === 3 ? style : {}} onClick={() => setForm({ ...form, q6: 3 })} > Above Average</h2>
                        <h2 style={form.q6 === 4 ? style : {}} onClick={() => setForm({ ...form, q6: 4 })} > Well Prepared</h2>
                    </div>
                </div>

                <div className="form-input">
                    <h1>7 ~ Do you have proper Study Material ?</h1>
                    <div className="form-input-ans">
                        <h2 style={form.q7 === 1 ? style : {}} onClick={() => setForm({ ...form, q7: 1 })} > Yes</h2>
                        <h2 style={form.q7 === 2 ? style : {}} onClick={() => setForm({ ...form, q7: 2 })} > No</h2>
                    </div>
                </div>

                <div className="form-input">
                    <h1>8 ~ Enter Your weak Topics of PCM</h1>
                    <div className="form-input-ans">
                        <input type='text' style={{ width: '90%' }} value={form.q8} onChange={(e) => setForm({ ...form, q8: e.target.value })} placeholder='Enter Topics'></input>
                    </div>
                </div>

                <div className="form-input">
                    <h1>9 ~ How many mocks test are you practicing per week ?</h1>
                    <div className="form-input-ans">
                        <input type='number' value={form.q9} onChange={(e) => setForm({ ...form, q9: e.target.value })} placeholder='Enter value'></input>
                    </div>
                </div>

                <div className="form-input">
                    <h1>10 ~ Do you have short notes for the revision ?</h1>
                    <div className="form-input-ans">
                        <h2 style={form.q10 === 1 ? style : {}} onClick={() => setForm({ ...form, q10: 1 })} > Yes</h2>
                        <h2 style={form.q10 === 2 ? style : {}} onClick={() => setForm({ ...form, q10: 2 })} > No</h2>
                    </div>
                </div>

                <div className="form-input">
                    <h1>11 ~ What is your Average Score in Mains exams ?</h1>
                    <div className="form-input-ans">
                        <input type='number' value={form.q11} onChange={(e) => setForm({ ...form, q11: e.target.value })} placeholder='Enter Value'></input>
                    </div>
                </div>

                <div className="form-input">
                    <h1>12 ~ How much average hours per day, you spend on social media ?</h1>
                    <div className="form-input-ans">
                        <input type='number' value={form.q12} onChange={(e) => setForm({ ...form, q12: e.target.value })} placeholder='Enter Value'></input>
                    </div>
                </div>

                <div className="form-input">
                    <h1>13 ~ Enter Your strong Topics of PCM (for Advance)</h1>
                    <div className="form-input-ans">
                        <input type='text' style={{ width: '90%' }} value={form.q13} onChange={(e) => setForm({ ...form, q13: e.target.value })} placeholder='Enter Topics'></input>
                    </div>
                </div>

                <div className="form-input">
                    <h1>14 ~ Which Institute's Test Series you are following ?</h1>
                    <div className="form-input-ans">
                        <input type='text' style={{ width: '90%' }} value={form.q14} onChange={(e) => setForm({ ...form, q14: e.target.value })} placeholder='Enter Topics'></input>
                    </div>
                </div>

                <button onClick={() => submit() }>Submit the Form</button>
            </div>
        </>
    )
}

export default Form