import React, {useState} from 'react'

const Menu = ()=> {

    const [ishtyle, setIshtyle] = useState('black')
  

return (
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512" height="30px" width="30px"><path fill="black" stroke={ishtyle} stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 152h336"></path><path fill="none" stroke={ishtyle} stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 256h336"></path><path fill="white" stroke={ishtyle} stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 360h336"></path></svg>
)}

export default Menu;


