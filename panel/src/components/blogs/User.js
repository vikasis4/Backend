import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './blogs.css'

const User = () => {

  const navigate = useNavigate();
  const clink = process.env.REACT_APP_LINK;
  const [users, setUsers] = useState([]);
  const [pin, setPin] = useState(0);
  const [courses, setCourses] = useState('no');
  const [numb, setNumb] = useState(0);
  const [email, setEmail] = useState('')

  const search = () => {
    if (users.filter(({ username }) => username === email).length === 0) {
      alert('Email Does Not Exist')
    } else {
      var fo = users.findIndex(({ username }) => username === email);
      console.log(fo);
      alert(`Available on Page no ${Math.ceil(fo / 20)}`)
    }
  }

  const updatesusb = (value) => {

    if (pin.length === 6) {
      axios.post(clink + '/manage/course', {
        pin,
        email: value.id,
        typ: value.typ
      }).then((response) => {
        if (response.data.status === 'success') {
          alert('successfully updated')
        } else {
          alert('Failed')
        }
      })
    } else {
      alert('Wrong pin')
    }
  }
  /////////
  useEffect(() => {
    axios.get(`${clink}/all/users`).then((response) => {
      setUsers(response.data)
      // for (let i = 0; i < 53; i++) {
      // users.push(...response.data)
      // }
    })
  }, [])
  /////////
  const deleteFxn = (id) => {
    try {
      axios.post(`${clink}/delete/user`, { id, pin }).then((response) => {
        if (response.data.status === 'yes') {
          alert('Deleted successfully')
        }
        else if (response.data.status === 'no') {
          alert('Wrong Pin or any other error')
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  ///////////
  const change = (id) => {
    setNumb(id)
  }
  var show = {
    color: 'white',
    backgroundColor: 'black'
  }
  var card = [];
  var btn;
  var random = []
  if (users.length > 0) {

    for (let i = 0; i < Math.ceil(users.length / 20); i++) {

      random.push({ m: i })
      if (i === Math.ceil(users.length / 20) - 1) {
        btn = (random).map((random) => {
          return (
            <>
              <button style={random.m === numb ? show : { color: 'black' }} className='change_btn' onClick={() => change(random.m)}>{random.m + 1}</button>
            </>
          )
        })
      }

      var data = [];
      var val = Math.ceil(users.length / 20) - i === 1 ? i * 20 + 20 - (Math.ceil(users.length / 20) * 20 - users.length) : i * 20 + 20;
      for (let j = i * 20; j < val; j++) {
        data.push(users[j])
      }
      card[i] = (data).map(
        (data) => {
          return (
            <>
              <div className="users-enter">
                <div className="users_complie">
                  <img src={data.img}></img>
                  <h2>{data.username}</h2>
                </div>

                <div className="users_complie">
                  {
                    courses === 'no' ?
                      <>
                        <h3><span style={{ color: 'black', fontSize: '3rem' }}>|| &nbsp;</span> {data.subarray.length > 0 ? (data.subarray).map((fxn) => { return <span>{fxn.name} &nbsp;</span> }) : <> Nill &nbsp;</>} <span style={{ color: 'black', fontSize: '3rem' }}> ||</span></h3>
                        <h3>{data.date.slice(0, 10)} &nbsp;
                          <span style={{ color: 'black', fontSize: '3rem' }}>|| </span>
                        </h3>
                        <h3>{data.last_seen}</h3>
                      </>
                      :
                      <></>
                  }
                  {
                    courses === 'yes' ?
                      <div className="act-btn">
                        <button onClick={() => { updatesusb({ typ: 'combo', id: data.username }) }}>Combo</button>
                        <button onClick={() => { updatesusb({ typ: 'material', id: data.username }) }}>Material</button>
                        <button onClick={() => { updatesusb({ typ: 'elev', id: data.username }) }}>23</button>
                        <button onClick={() => { updatesusb({ typ: 'twel', id: data.username }) }}>24</button>
                        <button onClick={() => { setCourses('no') }}>Close</button>
                      </div>
                      :
                      <>
                        <button className="classplus" onClick={() => { setCourses('yes') }}>Subscription</button>
                        <button className="classplus-del classplus" onClick={() => { deleteFxn(data.username) }}>Delete</button>
                      </>
                  }
                </div>
              </div>
            </>
          )
        }
      )
    }
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', fontFamily: "Dosis", fontSize: "3.6rem" }}>Users</h1>
      <input className="form-cnt" type="number" value={pin} placeholder="Enter Pin" onChange={(e) => { setPin(e.target.value) }}></input>
      <span className="classplus-s">Toatl users - {users.length}</span>
      <input className="form-cnt" type="text" value={email} placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }}></input>
      <button onClick={search} className='change_btn'>Search</button>
      <div className="select-btn">
        {btn}
      </div>
      <div className="users">
        {card[numb]}
      </div>
    </>
  )
}

export default User