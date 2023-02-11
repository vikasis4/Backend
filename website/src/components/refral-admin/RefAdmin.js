import React, { useState, useEffect } from 'react'
import './refadmin.css'
import axios from 'axios'

function RefAdmin() {

    const [refralId, setRefralId] = useState(null);
    const [users, setUsers] = useState(null);
    const [subUsers, setSubUsers] = useState(null);
    const [MatUsers, setMatUsers] = useState(null);
    const clink = process.env.REACT_APP_LINK;
    const [status, setStatus] = useState('false');


    const submit = () => {
        setStatus('loading')
        axios.post(clink + '/refral/users', { value: refralId }).then((response) => {
            if (response.data.status === 'success') {
                setUsers(response.data.total);
                setSubUsers(response.data.subs);
                setMatUsers(response.data.mats);
                setStatus('true')
            } else if (response.data.status === 'failed') {
                alert('Something went wrong please try again')
            }
        })
    }

    const [mapone, setMapone] = useState(null)
    const [maptwo, setMaptwo] = useState(null)
    const [mapthree, setMapthree] = useState(null)
    var a = 0;
    var b = 0;
    var c = 0;
    useEffect(() => {
        if (users || subUsers || MatUsers) {
            setMapone(users.map((users) => {
                b++;
                return (
                    <>
                        <div className="ref-admin-map">
                            <h1>{b}</h1>
                            <h1>{users.date.slice(0,10)}</h1>
                        </div>
                    </>
                )
            }))
            setMaptwo(subUsers.map((subUsers) => {
                a++;
                return (
                    <>
                        <div className="ref-admin-map">
                            <h1>{a}</h1>
                            <h1>{subUsers.date.slice(0,10)}</h1>
                        </div>
                    </>
                )
            }))
            setMapthree(MatUsers.map((MatUsers) => {
                c++;
                return (
                    <>
                        <div className="ref-admin-map">
                            <h1>{c}</h1>
                            <h1>{MatUsers.date.slice(0,10)}</h1>
                        </div>
                    </>
                )
            }))
        }
    }, [status])
    return (
        <>
            <div className="videopage-gap"></div>
            {
                status === 'false' ?
                    <div className="ref-admin">
                        <input type="text" value={refralId} onChange={(e) => setRefralId(e.target.value)} placeholder="Enter your refral id" />
                        <button onClick={() => submit()}>Submit</button>
                    </div>
                    :
                    status === 'loading' ?
                        <div className="ref-admin-load">
                            <h1>Loading...</h1>
                        </div>
                        :
                        <div className='ref-admin-main'>
                            <h6>{refralId}</h6>
                            <div className="ref-admin-flex">
                                <div className="ref-admin-main-left">
                                    <h2>Total Students registered :- {users.length}</h2>
                                    <div className="ref-admin-main-scent">
                                    {mapone}
                                    </div>
                                </div>
                                <div className="ref-admin-main-right">
                                    <h2>Total Students Purchased Course :- {subUsers.length}</h2>
                                    <div className="ref-admin-main-scent">
                                    {maptwo}
                                    </div>
                                </div>
                                <div className="ref-admin-main-right">
                                    <h2>Total Students Purchased Study Material :- {MatUsers.length}</h2>
                                    <div className="ref-admin-main-scent">
                                    {mapthree}
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </>
    )
}

export default RefAdmin