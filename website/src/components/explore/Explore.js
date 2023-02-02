import React, { useContext, useState, useEffect } from 'react'
import ProfileContext from "../../context/profile/ProfileContext";import './explore.css'
import { useNavigate } from 'react-router-dom';
import winner from './winner.png'
import '@vime/core/themes/default.css';
import { Player, Hls, DefaultUi } from '@vime/react';
import axios from 'axios';

function Explore() {

    const vlink = process.env.REACT_APP_VIDEO_LINK
    const hlsConfig = {
        // ...
    };

    const navigate = useNavigate();
    const profile = useContext(ProfileContext);
    const [op, setOp] = useState([]);
    const [cart, setCart] = useState([]);
    const clink = process.env.REACT_APP_LINK;
    const [statea, setStatea] = useState(false)
    const [stateb, setStateb] = useState(false)
    const [statec, setStatec] = useState(false)
    const [stated, setStated] = useState(false)
    const [statee, setStatee] = useState(false)
    const [position, setPosition] = useState(true)
    
    const [variables, setVariables] = useState({
      var1: 0,
      var2: 0,
      var3: 0,
      var4: 0,
      var5: 0,
    })
    
    useEffect(() => {
      axios.get(clink + '/variables/fetch').then((response) => {
        setVariables(response.data[0])
      })
    }, [])
  
    useEffect(() => {
  
      if (localStorage.getItem('reload-facility') === '89307988vikasREF') {
        const array = profile.profile.subarray;
        for (let i = 0; i < array.length; i++) {
          if (array[i].name === 'elev') {
            setStatea(true)
          }
          else if (array[i].name === 'twel') {
            setStateb(true)
          }
          else if (array[i].name === 'material') {
            setStatec(true)
          }
          else if (array[i].name === 'personal') {
            setStated(true)
          }
          else if (array[i].name === '2023CC') {
            setStatee(true)
          }
        }
        setCart(profile.profile.cart)
      }
    }, [])
  
    useEffect(() => {
      const newArray = profile.profile.subarray;
      for (let i = 0; i < newArray.length; i++) {
        op.push(newArray[i].value);
        setOp(op);
      }
    }, [])

    const updatecart = (value) => {

        if (cart.find(({ name }) => name === value)) {
          ////
        } else {
          cart.push({ name: value })
          setCart(cart);
          const user = profile.profile
          profile.setProfile({ ...user, cart })
          if (profile.profile.void === 'no') {
            axios.post(clink + '/cart', {
              id: profile.profile.id,
              cart
            }).then(response => {
              if (response.data.status === 'yes') {
                ////
              } else {
                alert('Something went wrong, please try again later')
              }
            })
          } else {
            localStorage.setItem('cart', cart)
          }
        }
      }

    return (
        <>
            <div className="videopage-gap"></div>
            <div className="explore">

                <div className="explore-heading">
                    <h1>JEE 2023 ~ Mains + Advance Mentorship</h1>
                </div>

                <div className="explore-enter-top">
                    <img src={winner} style={{ height: '12rem', width: '12rem' }} />
                    <h1>Target - Jee Mains 2023 ( 2nd Attempt ) and Advance</h1>
                </div>

                <div className="explore-enter-second">
                    <h1 style={{ paddingLeft: '3rem', fontWeight: '500' }}>This Batch Includes ~</h1>
                    <div className="explore-enter-second-list">
                        <h1>30+<br />Videos </h1><h2> | </h2>
                        <h1> Premium<br />Short Notes </h1><h2> | </h2>
                        <h1>Top<br />600 Questions </h1><h2> | </h2>
                        <h1> PYQ of<br />Mains+Advance </h1>
                    </div>
                </div>

                <div className="explore-enter-third">
                    <h1>Course Details</h1>
                    <div class="yt-vd">
                        <Player style={screen.width < 480 ? { width: '100%' } : { width: '60%' }} volume={100}>
                            <Hls version="latest" controls config={hlsConfig} poster={`${vlink}/hpage/image.jpg`}>
                                <source data-src={`${vlink}/hpage/out.m3u8`} type="application/x-mpegURL" />
                            </Hls>
                            <DefaultUi noClickToPlay>
                            </DefaultUi>
                        </Player>
                    </div>
                </div>

                <div className="explore-enter-fourth">
                    <h2>Mentors :</h2>
                    <h1>1) Vikas Singh ~ Nit Kurukshetra</h1>
                    <h1>2) Shubham Kumar ~ Nit Kurukshetra</h1>
                    <h1>3) Priya Verma ~ IIT Madrass</h1>
                    <h1>4) Sandeep Kumar~ IIT Kanpur</h1>
                </div>

                <div className="explore-enter-five">
                    <h1>Description</h1>

                    <div className="explore-enter-five-list">
                        <div className="explore-enter-five-inner">
                            <h3>1</h3>
                            <h2>Blizard is going on woooow</h2>
                        </div>
                        <div className="explore-enter-five-inner">
                            <h3>2</h3>
                            <h2>Blizard is not going on Boooo</h2>
                        </div>
                        <div className="explore-enter-five-inner">
                            <h3>3</h3>
                            <h2>Blizard is not going on Boooo</h2>
                        </div>
                        <div className="explore-enter-five-inner">
                            <h3>4</h3>
                            <h2>Blizard is not going on Boooo</h2>
                        </div>
                        <div className="explore-enter-five-inner">
                            <h3>5</h3>
                            <h2>Blizard is not going on Boooo</h2>
                        </div>
                        <div className="explore-enter-five-inner">
                            <h3>6</h3>
                            <h2>Blizard is not going on Boooo</h2>
                        </div>
                        <div className="explore-enter-five-inner">
                            <h3>7</h3>
                            <h2>Blizard is not going on Boooo</h2>
                        </div>
                        <div className="explore-enter-five-inner">
                            <h3>8</h3>
                            <h2>Blizard is not going on Boooo</h2>
                        </div>
                        <div className="explore-enter-five-inner">
                            <h3>9</h3>
                            <h2>Blizard is not going on Boooo</h2>
                        </div>
                    </div>

                </div>

                <div className="explore-buy">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>&#8377;999</h1>
                        <h2>42% off</h2>
                    </div>
                    <button onClick={() => { navigate('/checkout'); updatecart('2023CC') }}>Buy Now</button>
                </div>

            </div>
        </>
    )
}

export default Explore