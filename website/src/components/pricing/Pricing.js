import React, { useContext, useState, useEffect } from 'react'
import ProfileContext from "../../context/profile/ProfileContext";
import { useNavigate } from 'react-router-dom'
import './price.css'
import one from './one.png'
import two from './two.jpeg'
import three from './three.jpeg'
import four from '../homePageLO/course.png'
import jcourse from '../../svg/jcourse.svg'
import jblog from '../../svg/jblog.svg'
import jsupport from '../../svg/jsupport.svg'
import personal from './personal.png'
import axios from 'axios'

const Pricing = () => {


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
  const [variables, setVariables] = useState({
    var1:0,
    var2:0,
    var3:0,
    var4:0,
    var5:0,
    })

    useEffect(() => {
      axios.get(clink + '/variables/fetch').then((response)=>{
        setVariables(response.data[0])
      })
    },[])
  
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
        else if (array[i].name === 'combo') {
          setStatee(true)
        }
      }
      setCart(profile.profile.cart)
    }
  }, [profile])

  useEffect(() => {
    const newArray = profile.profile.subarray;
    for (let i = 0; i < newArray.length; i++) {
      op.push(newArray[i].value);
      setOp(op);
    }
  }, [])


  const updatecart = (value) => {
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

  return (
    <>

      <div className="price-cont">
        <div className="videopage-gap"></div>
        <div className="price-main">


          <div className="price-flex">
            <div className="price-mod">
              <div className="price-card">
                <div className="price-first-course">
                  <img className="price-img" src={one}></img>
                  <div className="price-cbtwn">
                    <p><img src={jcourse}></img> Jee guidance for 2023 batch</p>
                    <div className="price-tag">
                      <h4><span style={{color:'green'}}>&#8377;699</span> only <strong style={{color:'black'}}>||</strong> <span style={{color:'green'}}>{variables.var1}</span> students enrolled</h4>
                    </div>
                    <ul>
                      <li>&#10003; 23+ Doubt + Councelling videos - 2023</li>
                      <li>&#10003; JEE Mains approach</li>
                      <li>&#10003; JEE Advance approach</li>
                      <li>&#10003; Physics-chemistry-Maths RoadMaps</li>
                      <li>&#10003; Mistakes to avoid</li>
                      <li>&#10003; Proper Study plan</li>
                      <li>&#10003; 1 year access</li>
                    </ul>
                  </div>

                  <div className="price-cbt-panel">
                    {
                      statea === true ?
                        <button onClick={() => { profile.setCurrent('twel'); navigate('/course'); }} className="price-main-half-btn">Go to course</button>
                        :
                        cart.find(({ name }) => name === "twel") ?
                          <>
                            <button onClick={() => { navigate("/checkout") }} className="price-main-half-btn">Go to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('twel') }} className="price-main-half-btn">Buy now</button>
                          </>
                          :
                          <>
                            <button onClick={() => { updatecart('twel') }} className="price-main-half-btn">Add to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('twel') }} className="price-main-half-btn">Buy now</button>
                          </>
                    }
                  </div>
                </div>
              </div>
              <div className="price-card">
                <div className="price-first-course">
                  <img className="price-img" src={three}></img>
                  <div className="price-cbtwn">
                    <p><img src={jcourse}></img> Jee guidance for 2024 batch</p>
                    <div className="price-tag">
                      <h4><span style={{color:'green'}}>&#8377;1299</span> only <strong style={{color:'black'}}>||</strong> <span style={{color:'green'}}>{variables.var2}</span> students enrolled</h4>
                    </div>
                    <ul>
                      <li>&#10003; 23+ Doubt + Councelling videos - 2024</li>
                      <li>&#10003; JEE Mains approach</li>
                      <li>&#10003; JEE Advance approach</li>
                      <li>&#10003; Physics-chemistry-Maths RoadMaps</li>
                      <li>&#10003; Mistakes to avoid</li>
                      <li>&#10003; Proper Study plan</li>
                      <li>&#10003; 2 year access</li>
                    </ul>
                  </div>

                  <div className="price-cbt-panel">
                    {
                      stateb === true ?
                        <>
                          <button onClick={() => { profile.setCurrent('elev'); navigate('/course'); }} className="price-main-half-btn">Go to course</button>
                        </>
                        :
                        cart.find(({ name }) => name === "elev") ?
                          <>
                            <button onClick={() => { navigate("/checkout") }} className="price-main-half-btn">Go to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('elev') }} className="price-main-half-btn">Buy now</button>
                          </>
                          :
                          <>
                            <button onClick={() => { updatecart('elev') }} className="price-main-half-btn">Add to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('elev') }} className="price-main-half-btn">Buy now</button>
                          </>
                    }
                  </div>
                </div>
              </div>
              <div className="price-card">
                <div className="price-first-course">
                  <img className="price-img" src={two}></img>
                  <div className="price-cbtwn">
                    <p><img src={jblog}></img> Jee Study Material</p>
                    <div className="price-tag">
                      <h4><span style={{color:'green'}}>&#8377;399</span> only <strong style={{color:'black'}}>||</strong> <span style={{color:'green'}}>{variables.var3}</span> students purchased</h4>
                    </div>
                    <ul>
                      <li>&#10003; Complete study material</li>
                      <li>&#10003; Toppers notes</li>
                      <li>&#10003; MindMaps chapterwise</li>
                      <li>&#10003; Short notes</li>
                      <li>&#10003; JEE Mains Pyq + Solutions</li>
                      <li>&#10003; JEE Advance Pyq + Solutions</li>
                      <li>&#10003; 26 previos paper</li>
                    </ul>
                  </div>

                  <div className="price-cbt-panel">
                    {
                      statec === true ?

                        <button onClick={() => { profile.setCurrent('material'); navigate('/course'); }} className="price-main-half-btn">Go to course</button>
                        :
                        cart.find(({ name }) => name === "material") ?
                          <>
                            <button onClick={() => { navigate("/checkout") }} className="price-main-half-btn">Go to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('material') }} className="price-main-half-btn">Buy now</button>
                          </>
                          :
                          <>
                            <button onClick={() => { updatecart('material') }} className="price-main-half-btn">Add to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('material') }} className="price-main-half-btn">Buy now</button>
                          </>
                    }
                  </div>
                </div>
              </div>
             
              <div className="price-card">
                <div className="price-first-course">
                  <img className="price-img" src={personal}></img>
                  <div className="price-cbtwn">
                    <p><img src={jsupport}></img> Jee Personal 1-1 guidance</p>
                    <div className="price-tag">
                      <h4><span style={{color:'green'}}>&#8377;2999</span> only <strong style={{color:'black'}}>||</strong> <span style={{color:'green'}}>{variables.var4}</span> students enrolled</h4>
                    </div>
                    <ul>
                      <li>&#10003; Get a personal guide</li>
                      <li>&#10003; IITIAN support</li>
                      <li>&#10003; Doubt session</li>
                      <li>&#10003; Chat section</li>
                      <li>&#10003; 6 month Study plan</li>
                      <li>&#10003; 1 year access</li>
                    </ul>
                  </div>

                  <div className="price-cbt-panel">
                    {
                      stated === true ?
                        <button onClick={() => { navigate('/course'); }} className="price-main-half-btn">Go to course</button>
                        :
                        cart.find(({ name }) => name === "personal") ?
                          <>
                            <button onClick={() => { navigate("/checkout") }} className="price-main-half-btn">Go to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('personal') }} className="price-main-half-btn">Buy now</button>
                          </>
                          :
                          <>
                            <button onClick={() => { updatecart('personal') }} className="price-main-half-btn">Add to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('personal') }} className="price-main-half-btn">Buy now</button>
                          </>
                    }
                  </div>
                </div>
              </div>


            </div>
          </div>


          <div className="price-flex price-spl">
            <h2 className="deactivate-dis" data-text="&nbsp;&#8377; 999 for first 3000 students &nbsp;">&nbsp;&#8377; 999 for first 3000 students &nbsp;</h2>
            <div className="price-mod mob-price-mod">
              <div className="price-cardd">
                <div className="price-first-coursed">
                  <img src={four}></img>
                  <div className="price-cbtwn">
                    <p className="deactivate-dis">IITJEE combo pack for both 2023 & 2024</p>
                    <div className="price-gnxt">
                      <h2 className="activate-dis gnxt" data-text="&nbsp;&#8377;999 for first 3000 students &nbsp;">&nbsp;&#8377;999 for first 3000 students &nbsp;</h2>
                    </div>
                    <div className="price-tag">
                      <h4><span style={{color:'green'}}> <s style={{color:'red'}}>&#8377;2000</s> &nbsp; &#8377;999</span> only <strong style={{color:'black'}}>||</strong> <span style={{color:'green'}}>{variables.var5}</span> students enrolled</h4>
                    </div>
                    <ul>
                      <li>&#10003; 23+ Doubt + Councelling videos</li>
                      <li>&#10003; 1-1 personal guidance</li>
                      <li>&#10003; IITIANs support</li>
                      <li>&#10003; Doubt session</li>
                      <li>&#10003; IITJEE study material for both mains and advance</li>
                      <li>&#10003; Chat section</li>
                      <li>&#10003; 26 previous paper with solutions</li>
                      <li>&#10003; Toppers notes + short notes</li>
                      <li>&#10003; Weekly study plan</li>
                      <li>&#10003; 2 years access</li>
                    </ul>
                  </div>

                  <div className="price-cbt-panel">
                    {
                      statee === true ?
                        <button onClick={() => { profile.setCurrent('combo'); navigate('/course'); }} className="price-main-half-btn">Go to course</button>
                        :
                        cart.find(({ name }) => name === "combo") ?
                          <>
                            <button onClick={() => { navigate("/checkout") }} className="price-main-half-btn">Go to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('combo') }} className="price-main-half-btn">Buy now</button>
                          </>
                          :
                          <>
                            <button onClick={() => { updatecart('combo') }} className="price-main-half-btn">Add to cart</button>
                            <button onClick={() => { navigate('/checkout'); updatecart('combo') }} className="price-main-half-btn">Buy now</button>
                          </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default Pricing
