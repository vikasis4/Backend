import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, ArcElement, Tooltip, Legend, Chart } from 'chart.js';
ChartJS.register(...registerables, ArcElement, Tooltip, Legend);

import './comman.css'

function Stat() {

    // Chart.defaults.global.defaultFontColor = "white";
    Chart.defaults.color = "white"
    console.log(Chart.defaults.color)


    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
        datasets: [
            {
                label: 'Target Score',
                data: [ 80, 70, 100, 80, 120, 120, 120, 100, 120, 140, 160,170,160,170,180,180,200,300],
                borderColor: 'lightgreen',
                borderWidth: 1.2,
            },
            // {
            //     label: 'Target Score',
            //     data: [ 70, 60, 80, 61, 113, 110, 110, 80, 100, 130, 150,160,150,110,170,170,190,280],
            //     borderColor: 'white',
            //     borderWidth: 1.3,
            // }
        ]
    }

    const datas = {
        datasets: [
            {
                label: '',
                data: [60, 40],
                backgroundColor: [
                    '#03316D',
                    'lightgray',
                ],
                borderColor: [
                    'gray',
                ],
                borderWidth: 1,
            },
        ],
    };
    const datasP = {
        datasets: [
            {
                label: '',
                data: [50, 50],
                backgroundColor: [
                    'red',
                    'white',
                ],
                borderColor: [
                    'gray',
                ],
                borderWidth: 1,
            },
        ],
    };
    const datasC = {
        datasets: [
            {
                label: '',
                data: [70, 30],
                backgroundColor: [
                    'green',
                    'white',
                ],
                borderColor: [
                    'gray',
                ],
                borderWidth: 1,
            },
        ],
    };
    const datasM = {
        datasets: [
            {
                label: '',
                data: [30, 70],
                backgroundColor: [
                    'pink',
                    'white',
                ],
                borderColor: [
                    'gray',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div id="acquisitions" className="stat-main">
                <h1>Jee Mains Score Stats</h1>
                <Line
                    data={data}
                    style={{ backgroundColor: 'var(--c2)' }}
                    options={{
                        scales: {
                            x: {
                                ticks: {
                                    color: "white"
                                }
                            },
                            y: {
                                ticks: {
                                    color: "white"
                                }
                            }
                        }
                    }}
                />
                {/* <div className='pcm-bar'>

                    <div style={{ width: '30%' }}>
                        <h1>Physics Prepration</h1>
                        <Doughnut
                            data={datasP}
                            />
                    </div>
                    <div style={{ width: '30%' }}>
                            <h1>Chemistry Prepration</h1>
                        <Doughnut
                            data={datasC}
                            />
                    </div>
                    <div style={{ width: '30%' }}>
                            <h1>Maths Prepration</h1>
                        <Doughnut
                            data={datasM}
                        />
                    </div>
                  
                </div>
                <h1>Confidence Level Stats</h1>
                <div style={{ width: '70%', margin: '0 auto' }}>

                    <Doughnut
                        data={datas}
                    />
                </div> */}
            </div>
        </>
    )
}

export default Stat