import React, {useState} from 'react'
import ProfileContext from './ProfileContext';

const ProfileState=(props)=>{

const [disp, setDisp] = useState('none')
const [dispmessage, setDispmessage] = useState('Logging you in');
const [current, setCurrent] = useState('')
const [profile, setProfile] = useState({
    username: '',
    subscription:'',
    void:'',
    id: '',
    current:'',
    query: '',
    img:'',
    vkey:'',
    quality:'',
    type:'',
    name:'',
    subarray:[],
    room:'',
    cart:[],
});


    return (
    <ProfileContext.Provider value={{profile, setProfile, disp, setDisp, dispmessage, setDispmessage, current, setCurrent}} >
       { props.children}
    </ProfileContext.Provider>
    )
}
 export default ProfileState;