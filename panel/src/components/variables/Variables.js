import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './variable.css'

const Variables = () => {

    const [variables, setVariables] = useState([
        { var1: 0 },
        { var2: 0 },
        { var3: 0 },
        { var4: 0 },
        { var5: 0 },
    ]);
    const [display, setDisplay] = useState('on');
    const [var1, setVar1] = useState('')
    const [var2, setVar2] = useState('')
    const [var3, setVar3] = useState('')
    const [var4, setVar4] = useState('')
    const [var5, setVar5] = useState('')
    const clink = process.env.REACT_APP_LINK;

    const [taskArr, setTaskArr] = useState([]);
    const [tasks, setTasks] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [mar, setMar] = useState(null);

    const addtolist = () =>{
        taskArr.push({name:tasks});
        setTaskArr(taskArr);
        setTasks('')
    }
    const submitshit =() =>{
        axios.post(`${clink}/weeklytask/update`, {array:taskArr, from, to}).then((response) =>{
            if(response.data.status === 'yes'){
                alert('Successfully updated')
            }else{
                alert('Something went wrong')
            }
        })
    }
    const mapped = () =>{
        setMar(
            taskArr.map((taskArr) => {
                return(
                    <>
                    {taskArr.name} <br/>
                    </>
                )
            })
        )
    }
    useEffect(() => {
      mapped();
    }, [tasks])

    useEffect(() => {
        axios.get(clink + '/variables/fetch').then((response) => {
            setVariables(response.data)
        })
    }, [])
    useEffect(() => {
        if (variables.length > 0) {

        }
    }, [variables])



    const create = () => {
        axios.post(clink + '/variables/create', {
            var1,
            var2,
            var3,
            var4,
            var5,
        })
        setVar1('')
        setVar2('')
        setVar3('')
        setVar4('')
        setVar5('')
    }
    const update = () => {
        axios.put(clink + '/variables/update', {
            var1,
            var2,
            var3,
            var4,
            var5,
            id: variables[0]._id
        })
        setVar1('')
        setVar2('')
        setVar3('')
        setVar4('')
        setVar5('')
    }

    const toggle = (pre) => {
        if (pre === 'one') {
            setDisplay('on')
        }
        else if (pre === 'two') {
            setDisplay('off')
        }
    }

    return (
        <>
            <div className="variable">
                <div className="variable-nav">
                    <button onClick={() => toggle('one')}>Update Variable</button>
                    <button onClick={() => toggle('two')}>Create Variable</button>
                </div>

                {
                    display === 'on' ?
                        <>
                            <div className="variable-cont">
                                <h1>Update variable</h1>
                                <input type="text" value={var1} onChange={(e) => { setVar1(e.target.value) }} placeholder={variables[0].var1 + ' ////B23'}></input>
                                <input type="text" value={var2} onChange={(e) => { setVar2(e.target.value) }} placeholder={variables[0].var2 + ' ////B24'}></input>
                                <input type="text" value={var3} onChange={(e) => { setVar3(e.target.value) }} placeholder={variables[0].var3 + ' ////material'}></input>
                                <input type="text" value={var4} onChange={(e) => { setVar4(e.target.value) }} placeholder={variables[0].var4 + ' ////1-1'}></input>
                                <input type="text" value={var5} onChange={(e) => { setVar5(e.target.value) }} placeholder={variables[0].var5 + ' ////combo'}></input>
                                <button onClick={() => { update() }}>Update</button>
                            </div>
                        </>
                        :
                        <>
                            <div className="variable-cont">
                                <h1>Create new variable</h1>
                                <input type="text" value={var1} onChange={(e) => { setVar1(e.target.value) }} placeholder="var1"></input>
                                <input type="text" value={var2} onChange={(e) => { setVar2(e.target.value) }} placeholder="var2"></input>
                                <input type="text" value={var3} onChange={(e) => { setVar3(e.target.value) }} placeholder="var3"></input>
                                <input type="text" value={var4} onChange={(e) => { setVar4(e.target.value) }} placeholder="var4"></input>
                                <input type="text" value={var5} onChange={(e) => { setVar5(e.target.value) }} placeholder="var5"></input>
                                <button onClick={() => { create() }}>Create</button>
                            </div>
                        </>
                }
                <div className='variable-task'>
                    <h1>Weekly Tasks</h1>
                    <div className='variable-task-lis'>
                    <h2>
                    {mar}
                    </h2>
                    <input value={tasks} onChange={(e)=> setTasks(e.target.value)} placeholder="Enter Task"/>
                    <input value={from} onChange={(e)=> setFrom(e.target.value)} placeholder="Enter Date From"/>
                    <input value={to} onChange={(e)=> setTo(e.target.value)} placeholder="Enter Date To"/>
                    <button onClick={()=> submitshit()}>Submit</button>
                    <button onClick={()=> addtolist()}>Add To List</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Variables