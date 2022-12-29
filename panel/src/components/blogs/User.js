import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './blogs.css'

const User = () => {

  const navigate = useNavigate();
  const clink = process.env.REACT_APP_LINK;
  const [users, setUsers] = useState([]);
  const [pin, setPin] = useState(0);
  const [courses, setCourses] = useState('no')


  const updatesusb = (value)=>{

    if (pin.length === 6) {
      axios.post(clink+'/manage/course',{
        pin,
        email:value.id,
        typ:value.typ
      }).then((response)=>{
        if (response.data.status === 'success') {
          alert('successfully updated')
        }else{
          alert('Failed')
        }
      })
    }else{
      alert('Wrong pin')
    }
  }
  useEffect(() => {
    axios.get(`${clink}/all/users`).then((response) => {
      setUsers(response.data)
    })
  }, [])
  const deleteFxn = (id) =>{
    try {
      axios.post(`${clink}/delete/user`,{id, pin}).then((response) => {
        if(response.data.status === 'yes'){
          alert('Deleted successfully')
        }
        else if(response.data.status === 'no'){
          alert('Wrong Pin or any other error')
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  var card;
  if (users.length > 0) {
    card = (users).map(
      (users) => {

        return (
          <>
            <div className="users-enter">
              <img src={users.img}></img>
              <h2>{users.username}</h2>
             {
              courses === 'no' ?
              <>
              <h3><span style={{color: 'black', fontSize: '3rem'}}>|| &nbsp;</span> {users.subarray.length > 0 ? (users.subarray).map((fxn)=>{ return <span>{fxn.name} &nbsp;</span>}) :<> Nill &nbsp;</>} <span style={{color: 'black', fontSize: '3rem'}}> ||</span></h3>
              <h3>{users.date.slice(0,10)} &nbsp;
              <span style={{color: 'black', fontSize: '3rem'}}>|| </span> 
              </h3>
              <h3>{users.last_seen}</h3>
             </>
             :
             <></>
              }
             {
              courses === 'yes' ?
              <div className="act-btn">
                <button onClick={() =>{updatesusb({typ:'combo', id:users.username})}}>Combo</button>
                <button onClick={() =>{updatesusb({typ:'material', id:users.username})}}>Material</button>
                <button onClick={() =>{updatesusb({typ:'elev', id:users.username})}}>23</button>
                <button onClick={() =>{updatesusb({typ:'twel', id:users.username})}}>24</button>
                <button onClick={() =>{setCourses('no')}}>Close</button>
              </div>
              :
              <>
              <button className="classplus"onClick={() =>{setCourses('yes')}}>Subscription</button>
              <button className="classplus-del classplus"onClick={() =>{deleteFxn(users.username)}}>Delete</button>
              </>
              }
            </div>
          </>
        )
      }
    )
  }

  return (
    <>
    <h1 style={{textAlign: 'center', fontFamily:"Dosis", fontSize:"3.6rem"}}>Users</h1>
    <input className="form-cnt" type="number" value={pin} placeholder="Enter Pin" onChange={(e) => {setPin(e.target.value)}}></input>
    <span className="classplus-s">Toatl users - {users.length}</span>
    <div className="users">
      {card}
    </div>
    </>
  )
}

export default User