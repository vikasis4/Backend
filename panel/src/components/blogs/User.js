import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './blogs.css'

const User = () => {

  const navigate = useNavigate();
  const clink = process.env.REACT_APP_LINK;
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${clink}/all/users`).then((response) => {
      setUsers(response.data)
    })
  }, [])
  var card;
  if (users.length > 0) {
    card = (users).map(
      (users) => {

        return (
          <>
            <div className="users-enter">
              <img src={users.img}></img>
              <h2>{users.username}</h2>
              <h3><span style={{color: 'black', fontSize: '3rem'}}>|| &nbsp;</span> {users.subarray.length > 0 ? (users.subarray).map((fxn)=>{ return <span>{fxn.name} &nbsp;</span>}) :<> Nill &nbsp;</>} <span style={{color: 'black', fontSize: '3rem'}}> ||</span></h3>
              <h3>{users.date.slice(0,10)} &nbsp;
              <span style={{color: 'black', fontSize: '3rem'}}>|| </span> 
              </h3>
              <h3>{users.last_seen}</h3>
            </div>
          </>
        )
      }
    )
  }

  return (
    <>
    <h1 style={{textAlign: 'center', fontFamily:"Dosis", fontSize:"3.6rem"}}>Users</h1>
    <div className="users">
      {card}
    </div>
    </>
  )
}

export default User