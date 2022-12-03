import React, { useState, useEffect } from 'react'
import './books.css'
import a from './A.jpg'
import b from './B.jpg'
import c from './C.jpg'
import d from './D.jpg'
import e from './E.jpg'
import f from './F.jpg'
import g from './G.jpg'
import h from './H.jpg'
import i from './I.jpg'
import j from './J.jpg'
import k from './K.jpg'
import l from './L.jpg'
import m from './M.jpg'
import n from './N.jpg'
import o from './O.jpg'
import p from './P.jpg'
import q from './Q.jpg'
import r from './R.jpg'
import s from './S.jpg'
import t from './T.jpg'
import u from './U.jpg'
import v from './V.jpg'
import aa from './aa.jpg'
import ab from './ab.jpg'
import ac from './ac.jpg'
import ad from './ad.jpg'


const Books = () => {

    const array = [
        {
            name: 'Concepts of physics part 1 & 2',
            author: 'HC verma',
            type: 'mains',
            subject: 'physics',
            src: 'https://amzn.to/3E70cb3',
            img: a
        },
        {
            name: 'DC Pandey set of 5 books (Complete physics of class 11th and 12th)',
            author: 'DC pandey',
            type: 'mains',
            subject: 'physics',
            src: 'https://amzn.to/3hgEE2T',
            img: b
        },
        {
            name: 'Fundamentals of Physics by Halliday, Resnick & walker',
            author: 'Halliday, Resnick & walker',
            type: 'mains',
            subject: 'physics',
            src: 'https://amzn.to/3E4ph6y',
            img: c
        },
        {
            name: 'NCERT Textbooks (for Class XI and XII ) For JEE MAINS',
            author: 'NCERT',
            type: 'mains',
            subject: 'chemistry',
            src: 'https://amzn.to/3fD6INg',
            img: d
        },
        {
            name: 'PROBLEMS IN PHYSICAL CHEMISTRY',
            author: 'NARENDRA AWASTHI',
            type: 'mains',
            subject: 'chemistry',
            src: 'https://amzn.to/3h6sjOq',
            img: e
        },
        {
            name: 'Advanced Problems in Organic Chemistry',
            author: 'M.S. CHOUHAN',
            type: 'mains',
            subject: 'chemistry',
            src: 'https://amzn.to/3WALU9O',
            img: f
        },
        {
            name: 'CONCEPTS OF ORGANIC Chemistry',
            author: 'O.P. TONDON',
            type: 'mains',
            subject: 'chemistry',
            src: 'https://amzn.to/3zPjBdT',
            img: g
        },
        {
            name: 'Concept of Physical Chemistry',
            author: 'P Bahadur',
            type: 'mains',
            subject: 'chemistry',
            src: 'https://amzn.to/3WvEW65',
            img: h
        },
        {
            name: 'Objective Mathematics',
            author: 'R D Sharma',
            type: 'mains',
            subject: 'maths',
            src: 'https://amzn.to/3DF4rsR',
            img: i
        },
        {
            name: 'Plane Trigonometry',
            author: 'S L Loney',
            type: 'mains',
            subject: 'maths',
            src: 'https://amzn.to/3E6kKAk',
            img: j
        },
        {
            name: 'The Elements Of Coordinate Geometry',
            author: 'S L Loney',
            type: 'mains',
            subject: 'maths',
            src: 'https://amzn.to/3DJlb26',
            img: k
        },
        {
            name: 'Algebra by Dr S K Goyal Arihant Publications',
            author: 'Dr S K Goyal',
            type: 'mains',
            subject: 'maths',
            src: 'https://amzn.to/3fAxUwh',
            img: l
        },
        {
            name: 'Integral Calculus',
            author: 'Amit M Agarwal',
            type: 'mains',
            subject: 'maths',
            src: 'https://amzn.to/3FQU20a',
            img: m
        },
        {
            name: 'CENGAGE Physics For JEE Advanced ( SET OF 6 )',
            author: 'CENGAGE',
            type: 'advance',
            subject: 'physics',
            src: 'https://amzn.to/3DL74JA',
            img: n
        },
        {
            name: 'I.E Irodov Problems in General physics',
            author: 'I.E Irodov',
            type: 'advance',
            subject: 'physics',
            src: 'https://amzn.to/3DGks1F',
            img: o
        },
        {
            name: 'Problems in physics by SS Krotov',
            author: 'SS Krotov',
            type: 'advance',
            subject: 'physics',
            src: 'https://amzn.to/3UsQlBG',
            img: p
        },
        {
            name: 'Halliday, Resnick & walker - JEE ADVANCE',
            author: 'Halliday, Resnick & walker',
            type: 'advance',
            subject: 'physics',
            src: 'https://amzn.to/3E4ph6y',
            img: q
        },
        {
            name: 'JEE ADVANCE - Grb Advanced Problems In Physical Chemistry',
            author: 'Himanshu pandey',
            type: 'advance',
            subject: 'chemistry',
            src: 'https://amzn.to/3UtsJNl',
            img: r
        },
        {
            name: 'Concise Inorganic Chemistry by J D Lee',
            author: 'J D Lee',
            type: 'advance',
            subject: 'chemistry',
            src: 'https://amzn.to/3t2U0uj',
            img: s
        },
        {
            name: 'Organic Chemistry by Morrison & Boyd',
            author: 'Morrison & Boyd',
            type: 'advance',
            subject: 'chemistry',
            src: 'https://amzn.to/3NIftCh',
            img: t
        },
        {
            name: 'CENGAGE MATHS - JEE ADVANCE ( SET OF 5 BOOKS )',
            author: 'CENGAGE',
            type: 'advance',
            subject: 'maths',
            src: 'https://amzn.to/3t5o7kM',
            img: u
        },
        {
            name: 'ARIHANT JEE (Main & Advanced) Maths Combo',
            author: 'ARIHANT',
            type: 'advance',
            subject: 'maths',
            src: 'https://amzn.to/3DJpf2m',
            img: v
        },
        {
            name: 'Disha Experts JEE Mains PYQ Books (Set of 3) ( 2002 - 2022 )',
            type: 'pyq',
            subject: 'pyq',
            src: 'https://amzn.to/3E8uYQI',
            img: aa
        },
        {
            name: 'Arihant  JEE Main Solved Papers PCM (Set of 3) 20 Years PYQ',
            type: 'pyq',
            subject: 'pyq',
            src: 'https://amzn.to/3fI2sw0',
            img: ab
        },
        {
            name: 'Disha Experts JEE Advance PYQ Books (Set of 3) (1978 - 2022)',
            type: 'pyq',
            subject: 'pyq',
            src: 'https://amzn.to/3fLMaSH',
            img: ac
        },
        {
            name: 'Arihant IITJEE Advance PCM 43 Years PYQ (Set of 3 Books)',
            type: 'pyq',
            subject: 'pyq',
            src: 'https://amzn.to/3UsQVPK',
            img: ad
        },
    ]
    const [state1, setState1] = useState('one');
    const [state2, setState2] = useState('p');
    var style1 = {
        transform: 'translateY(-20px)'
    }
    var style2 = {
        transform: 'translateY(0px)'
    }
    const mov1 = (value) => {
        if (value === 'one') {
            setState1('one')
        }
        else if (value === 'two') {
            setState1('two')
        }
        else if (value === 'three') {
            setState1('three')
        }
    }
    const mov2 = (value) => {
        if (value === 'p') {
            setState2('p')
        }
        else if (value === 'c') {
            setState2('c')
        }
        else if (value === 'm') {
            setState2('m')
        }
    }

    var pm = '';
    var cm = '';
    var mm = '';
    var pa = '';
    var ca = '';
    var ma = '';
    var pp = '';
    const purchase = (link) => {
        window.open(link, '_blank');
    }

    pm = array.map(
        (array) => {
            if (array.type === 'mains' && array.subject === 'physics') {
                return (
                    <>
                        <div className="book-cont">
                            <img src={array.img}></img>
                            <div className="book-for">
                                <h2>{array.name}</h2>
                                <h3>Author ~{array.author}</h3>
                                <button onClick={() => purchase(array.src)}>Check on Amazon</button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    )
    cm = array.map(
        (array) => {
            if (array.type === 'mains' && array.subject === 'chemistry') {
                return (
                    <>
                        <div className="book-cont">
                            <img src={array.img}></img>
                            <div className="book-for">
                                <h2>{array.name}</h2>
                                <h3>Author ~{array.author}</h3>
                                <button onClick={() => purchase(array.src)}>Check on Amazon</button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    )
    mm = array.map(
        (array) => {
            if (array.type === 'mains' && array.subject === 'maths') {
                return (
                    <>
                        <div className="book-cont">
                            <img src={array.img}></img>
                            <div className="book-for">
                                <h2>{array.name}</h2>
                                <h3>Author ~{array.author}</h3>
                                <button onClick={() => purchase(array.src)}>Check on Amazon</button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    )
    pa = array.map(
        (array) => {
            if (array.type === 'advance' && array.subject === 'physics') {
                return (
                    <>
                        <div className="book-cont">
                            <img src={array.img}></img>
                            <div className="book-for">
                                <h2>{array.name}</h2>
                                <h3>Author ~{array.author}</h3>
                                <button onClick={() => purchase(array.src)}>Check on Amazon</button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    )
    ca = array.map(
        (array) => {
            if (array.type === 'advance' && array.subject === 'chemistry') {
                return (
                    <>
                        <div className="book-cont">
                            <img src={array.img}></img>
                            <div className="book-for">
                                <h2>{array.name}</h2>
                                <h3>Author ~{array.author}</h3>
                                <button onClick={() => purchase(array.src)}>Check on Amazon</button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    )
    ma = array.map(
        (array) => {
            if (array.type === 'advance' && array.subject === 'maths') {
                return (
                    <>
                        <div className="book-cont">
                            <img src={array.img}></img>
                            <div className="book-for">
                                <h2>{array.name}</h2>
                                <h3>Author ~{array.author}</h3>
                                <button onClick={() => purchase(array.src)}>Check on Amazon</button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    )
    pp = array.map(
        (array) => {
            if (array.type === 'pyq' && array.subject === 'pyq') {
                return (
                    <>
                        <div className="book-cont">
                            <img src={array.img}></img>
                            <div className="book-for">
                                <h2>{array.name}</h2>
                                <button onClick={() => purchase(array.src)}>Check on Amazon</button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    )

    return (
        <>
            <div className="videopage-gap"></div>
            <div className="book">
                <h1>Best Books for JEE preparation</h1>
                <div className="book-state">
                    <div className="book-state1">
                        <button style={state1 === 'one' ? style1 : style2} className="book-start" onClick={() => mov1('one')}>Mains</button>
                        <button style={state1 === 'two' ? style1 : style2} onClick={() => mov1('two')}>Advance</button>
                        <button style={state1 === 'three' ? style1 : style2} onClick={() => mov1('three')}>Pyq Books</button>
                    </div>
                    <p className="p-element"></p>
                    {
                        state1 === 'three' ?
                            <h1>Previous Years Questions Books</h1>
                            :
                            <div className="book-state2">
                                <button style={state2 === 'p' ? style1 : style2} className="book-start" onClick={() => mov2('p')}>Physics</button>
                                <button style={state2 === 'c' ? style1 : style2} onClick={() => mov2('c')}>Chemistry</button>
                                <button style={state2 === 'm' ? style1 : style2} onClick={() => mov2('m')}>Maths</button>
                            </div>
                    }
                </div>
                {
                    state1 === 'three' ?
                        ''
                        :
                        <h1>Books for {state2 === 'p' ? 'Physics' : state2 === 'c' ? 'Chemistry' : 'Maths'}/{state1 === 'one' ? 'Mains' : 'Advance'} level</h1>
                }
                <div className="book-one">
                    {
                        state1 === 'one' ?
                            state2 === 'p' ? pm : state2 === 'c' ? cm : mm
                            :
                            state1 === 'two' ?
                                state2 === 'p' ? pa : state2 === 'c' ? ca : ma
                                :
                                pp
                    }
                </div>
            </div>
        </>
    )
}

export default Books