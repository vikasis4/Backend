import React, {useEffect, useState} from 'react'
import nf1 from './nf1.png'
import nf2 from './nf2.png'

function Not() {

    const [seconds, setSeconds] = useState(0)
    useEffect(() => {
        if (seconds === 0) {
            var timer = setInterval(() => {
                document.getElementById('notifi-car').style.transform = "translateX(-64rem)";
                setSeconds(1)
            }, 3500)
              return () => clearInterval(timer)
            }else{
           var bimer = setInterval(() => {
                document.getElementById('notifi-car').style.transform = "translateX(0rem)";
                setSeconds(0)
              }, 3500)
              return () => clearInterval(bimer)
        }
    },[seconds])
    
    const change = (value) => {
        document.getElementById('notifi-car').style.transform = `translateX(${value})`;
        if (value === '0') {
            setSeconds(0)
        }else{
            setSeconds(1)
        }
    }

    return (
        <>
            {
                screen.width < 480 ?
                    <>
                        <div className="notifi">
                            <div id="notifi-car" className="notifi-car">
                                <img src={nf2} style={{ width: '64rem', borderRadius: '0.4rem' }} />
                                <img src={nf1} style={{ width: '64rem', borderRadius: '0.4rem' }} />
                            </div>
                        </div>
                        <div className="notifi-ball">
                            <p onClick={() => change('0')} style={{backgroundColor: seconds !== 0 ? 'white' : 'black'}}></p>
                            <p onClick={() => change('-64rem')} style={{backgroundColor: seconds === 0 ? 'white' : 'black'}}></p>
                        </div>
                    </>
                    :
                    ''
            }
        </>
    )
}

export default Not