import React, { useState } from 'react'
import CourseContext from './CourseContext';

const CourseState = (props) => {

    const [course, setCourse] = useState([]);

    const update = async (obj) => {
        localStorage.setItem('cu_name', obj.name)
        localStorage.setItem('cu_bname', obj.bname)
        localStorage.setItem('cu_cat', obj.category)
    }

    return (
        <CourseContext.Provider value={{ course, setCourse, update }} >
            {props.children}
        </CourseContext.Provider>
    )
}
export default CourseState;