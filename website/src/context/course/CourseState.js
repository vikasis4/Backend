import React, {useState} from 'react'
import CourseContext from './CourseContext';
import axios from 'axios'

const CourseState =(props)=>{

    
    const [course, setCourse] = useState([]);
    const [progress, setProgress] = useState('');
    const clink = process.env.REACT_APP_LINK
    
    
    const update = async (obj)=> {
        const current = {
            name: obj.name,
            bname: obj.bname,
            category: obj.category,
        }
        const id = obj.id    
        await axios.put(clink+'/updatecurrent',{current, id})
            setProgress(40)
    }



    return (
    <CourseContext.Provider value={{course, setCourse, update}} >
       { props.children}
    </CourseContext.Provider>
    )
}
 export default CourseState;