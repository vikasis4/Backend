import React, { useContext, useState, useEffect } from 'react'
import ProfileContext from "../../context/profile/ProfileContext";
import { useNavigate } from 'react-router-dom'
import './price.css'
import one from './one.png'
import two from './two.jpg'
import three from './three.jpg'
import four from '../homePageLO/course.png'
import personal from './personal.png'
import axios from 'axios'
import sales from './sales/sales2.jpg'
import medal from '../../svg/badge.svg'
import deals from './sales/deals.jpg'
import { Helmet } from 'react-helmet'

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
  const [position, setPosition] = useState(true)
  const [styled, setStyled] = useState({
    yes: {
      transform: 'translateY(-1rem)',
      borderBottom: '4px solid navy'
    },
    no: {
      transform: 'translateY(0rem)',
      borderBottom: '4px solid var(--s4)'
    }
  })
  const [variables, setVariables] = useState({
    var1: 0,
    var2: 0,
    var3: 0,
    var4: 0,
    var5: 0,
  })
  const changepos = () => {
    if (position === true) {
      setPosition(false)
    } else {
      setPosition(true)
    }
  }
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
        else if (array[i].name === 'combo') {
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

  var ds = new Date();
  const [seconds, setSeconds] = useState(60 - ds.getSeconds())
  const [mins,setMins] = useState(60 - ds.getMinutes())
  const [Hrs, setHrs] = useState(48 - ds.getHours())
  var timer;
  useEffect(() => {
      timer = setInterval(() => {
          setSeconds(seconds - 1);
          if (seconds === 0) {
              setSeconds(60);
              setMins(mins - 1)
          }
          if (mins === 0) {
              setMins(60);
              setHrs(24 - ds.getHours())
          }
          if (Hrs === 0) {
              setHrs(24 - ds.getHours());
          }
      }, 1000)
      return () => clearInterval(timer)
  })

  return (
    <>

      <div className="price-cont">
        <Helmet>
          <title>RankBoost - Pricing Page</title>
          <meta name="keywords" content="RankBoost pricing price cost courses course guidance mentorship iit jee" />
          <meta name="description" content="Rankboost Pricing Page - IITJEE guidance and mentorship courses with highly affordable prices along with one to one personal guidance. Jee guidance courses for 2023 and 2024 batches. Grab the Combo pack to get all features in one course with very low price, special offer valid for limited time " />
        </Helmet>
        <div className="videopage-gap"></div>
        {/* ///////////////////////////// Desktop view starts ///////////////////////////////// */}
        <div className="deactivate-dis">
          <div className="pd_main">
            <div className="pd_one">
              <div className="pd_one_head">
                <h1>Choose Your Plan</h1>
                {/* <div className="pd_one_button">
                  <button style={position === true ? styled.yes : styled.no} onClick={() => { changepos() }}>JEE Guidance Courses </button>
                  <button style={position === false ? styled.yes : styled.no} onClick={() => { changepos() }}> 1-1 Personal Guidance  </button>
                </div> */}
              </div>
            </div>
            <div className="pd_two">
              <div style={position === true ? { display: 'block' } : { display: 'none' }} className="pd_two_one">
                <div className="pd_card_cont">

                  <div className="pd_card">
                    <div className="pd_card_one">
                      <img src={one}></img>
                      <h1>Jee Guidance For 2023 Batch</h1>
                    </div>
                    <div className="pd_card_two">
                      <div className="pd_card_slab">
                        <h4>Discounted price  &nbsp; &#8377; 699 only</h4>
                        <h3>Flat 70% off</h3>
                        <div className="pd_control_buttons">
                          {
                            statea === true ?
                              <button onClick={() => { profile.setCurrent('twel'); navigate('/course'); }}>Go to course</button>
                              :
                              cart.find(({ name }) => name === "twel") ?
                                <>
                                  <button onClick={() => { navigate("/checkout") }}>Go to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('twel') }}>Buy now</button>
                                </>
                                :
                                <>
                                  <button onClick={() => { updatecart('twel') }}>Add to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('twel') }}>Buy now</button>
                                </>
                          }
                        </div>
                        <span className="pd_h6">
                          {variables.var1} students enrolled
                        </span>
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
                    </div>
                  </div>
                  <div className="pd_card">
                    <div className="pd_card_one">
                      <img src={three}></img>
                      <h1>Jee Guidance For 2024 Batch</h1>
                    </div>
                    <div className="pd_card_two">
                      <div className="pd_card_slab">
                        <h4>Discounted price  &nbsp; &#8377; 1299 only</h4>
                        <h3>Flat 70% off</h3>
                        <div className="pd_control_buttons">
                          {
                            stateb === true ?
                              <>
                                <button onClick={() => { profile.setCurrent('elev'); navigate('/course'); }}>Go to course</button>
                              </>
                              :
                              cart.find(({ name }) => name === "elev") ?
                                <>
                                  <button onClick={() => { navigate("/checkout") }} >Go to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('elev') }} >Buy now</button>
                                </>
                                :
                                <>
                                  <button onClick={() => { updatecart('elev') }} >Add to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('elev') }}>Buy now</button>
                                </>
                          }
                        </div>
                        <span className="pd_h6">
                          {variables.var2} students enrolled
                        </span>
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
                    </div>
                  </div>
                  <div className="pd_card pd_card_combo">
                    <div className="pd_card_one pd_cambo">
                      <div className="pd_card_useless">
                        <h6>Best Deal</h6>
                      </div>
                      <img src={four}></img>
                      <h1>Combo For 2023 & 2024 Batch</h1>
                    </div>
                    <div className="pd_card_two">
                      <div className="pd_card_slab pd_slab_combo">
                        <h4>Discounted price  &nbsp; &#8377; 499 only</h4>
                        <h3>Flat 85% off</h3>
                        <div className="pd_control_buttons">
                          {
                            statee === true ?
                              <button onClick={() => { profile.setCurrent('combo'); navigate('/course'); }} >Go to course</button>
                              :
                              cart.find(({ name }) => name === "combo") ?
                                <>
                                  <button onClick={() => { navigate("/checkout") }} >Go to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('combo') }} >Buy now</button>
                                </>
                                :
                                <>
                                  <button onClick={() => { updatecart('combo') }} >Add to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('combo') }} >Buy now</button>
                                </>
                          }
                        </div>
                        <span className="pd_h6 pd_combo_h6">
                          {variables.var5} students enrolled
                        </span>
                        <ul>
                          <li>&#10003; 23+ Doubt + Councelling videos</li>
                          {/* <li>&#10003; 1-1 personal guidance (3 Months access) worth &#8377; 2,499</li> */}
                          <li>&#10003; IITIANs support</li>
                          <li>&#10003; Doubt session</li>
                          <li>&#10003; Study material for mains and advance</li>
                          <li>&#10003; Chat section</li>
                          <li>&#10003; 26 previous year papers with solutions</li>
                          <li>&#10003; Toppers notes + short notes</li>
                          <li>&#10003; Weekly study plan</li>
                          <li>&#10003; 2 years access</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="pd_card">
                    <div className="pd_card_one">
                      <img src={two}></img>
                      <h1>Jee Study Material</h1>
                    </div>
                    <div className="pd_card_two">
                      <div className="pd_card_slab">
                        <h4>Discounted price  &nbsp; &#8377; 399 only</h4>
                        <h3>Flat 70% off</h3>
                        <div className="pd_control_buttons">
                          {
                            statec === true ?

                              <button onClick={() => { profile.setCurrent('material'); navigate('/course'); }} >Go to course</button>
                              :
                              cart.find(({ name }) => name === "material") ?
                                <>
                                  <button onClick={() => { navigate("/checkout") }} >Go to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('material') }} >Buy now</button>
                                </>
                                :
                                <>
                                  <button onClick={() => { updatecart('material') }} >Add to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('material') }} >Buy now</button>
                                </>
                          }
                        </div>
                        <span className="pd_h6">
                          {variables.var3} students enrolled
                        </span>
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
                    </div>
                  </div>

                </div>
              </div>
              <div className="pd_two_two"></div>
            </div>
          </div>
        </div>
        {/* //////////////////////////// mobile view starts /////////////////////////////////// */}
        <div className="activate-dis">

          <div className="price-main">
            <div className="price-flex">
              <div className="price-mod">

                <div className="price-card">
                  <div className="price-first-course">
                    <img className="price-img" src={one}></img>
                    <div className="price-cbtwn">
                      <p className="price-head">Jee guidance for 2023 batch</p>
                      <div className="price-tag">
                        <h5><span > Original price  &nbsp; &#8377; 1,400</span></h5>
                        <h4><span > Discounted price  &nbsp; &#8377;699 only</span></h4>
                        <h3 className="price-call"><img className="price-call-img" src={medal}></img>Flat 50% off</h3>
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
                        <span className="price-h6">
                          {variables.var1} students enrolled
                        </span>
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


                  </div>
                </div>
                <div className="price-card">
                  <div className="price-first-course">
                    <img className="price-img" src={three}></img>
                    <div className="price-cbtwn">
                      <p className="price-head">Jee guidance for 2024 batch</p>
                      <div className="price-tag">
                        <h5><span > Original price  &nbsp; &#8377; 2,600</span></h5>
                        <h4><span > Discounted price  &nbsp; &#8377;1299 only</span>
                        </h4>
                        <h3 className="price-call"><img className="price-call-img" src={medal}></img>Flat 50% off</h3>
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
                        <span className="price-h6">
                          {variables.var2} students enrolled
                        </span>
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


                  </div>
                </div>
                <div className="price-card">
                  <div className="price-first-course">
                    <img className="price-img" src={two}></img>
                    <div className="price-cbtwn">
                      <p className="price-head">Study Material</p>
                      <div className="price-tag">
                        <h5><span > Original price  &nbsp; &#8377; 1000</span></h5>
                        <h4><span > Discounted price  &nbsp; &#8377;399 only</span></h4>
                        <h3 className="price-call"><img className="price-call-img" src={medal}></img>Flat 60% off</h3>
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
                        <span className="price-h6">
                          {variables.var3} students enrolled
                        </span>
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
                  </div>
                </div>
                {/* 
                <div className="price-card">
                  <div className="price-first-course">
                    <img className="price-img" src={personal}></img>
                    <div className="price-cbtwn">
                      <p className="price-head"> Jee Personal 1-1 guidance</p>
                      <div className="price-tag">
                        <div className="price-cbt-panel">
                          <h4><span > Discounted price  &nbsp; &#8377;1897 only</span></h4>
                          <h3 className="price-call"><img className="price-call-img" src={medal}></img>Flat 60% off</h3>
                          {
                            stated === true ?
                              <button onClick={() => { navigate('/course'); }} className="price-main-half-btn">Go to course</button>
                              :
                              cart.find(({ name }) => name === "personal") ?
                                <>
                                  <button onClick={() => { navigate("/checkout") }} className="price-main-half-btn">Go to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('personal2') }} className="price-main-half-btn">Buy now</button>
                                </>
                                :
                                <>
                                  <button onClick={() => { updatecart('personal') }} className="price-main-half-btn">Add to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('personal') }} className="price-main-half-btn">Buy now</button>
                                </>
                          }
                        </div>
                        <span className="price-h6">
                          {variables.var4} students enrolled
                        </span>
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
                  </div>
                </div> */}
              </div>
            </div>


            <div className="price-flex price-spl">
              <div className="price-mod mob-price-mod">
                <div className="price-cardd">
                  <img className="price-deal" src={deals}></img>
                  <div className="price-first-coursed">
                    <img className="price-first-coursed-img" src={four}></img>
                    <div className="price-cbtwn">
                      <div className="price-tag">
                        <p className="price-head">COMBO Pack for Both 2023 & 2024</p>
                        <h5><span > Original price  &nbsp; &#8377; <strike>4,000</strike></span></h5>
                        <h4><span > Discounted price  &nbsp; &#8377;499 only</span></h4>
                        <h3 className="price-call"><img className="price-call-img" src={medal}></img>Flat 85% off</h3>

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
                        <span className="price-h6">
                          {variables.var5} students enrolled
                        </span>


                      </div>
                      <ul>
                        <li>&#10003; 23+ Doubt + Councelling videos</li>
                        {/* <li>&#10003; 1-1 personal guidance</li> */}
                        <li>&#10003; IITIANs support</li>
                        <li>&#10003; Doubt session</li>
                        <li>&#10003; Study material for both mains and advance</li>
                        <li>&#10003; Chat section</li>
                        <li>&#10003; 26 previous year papers with solutions</li>
                        <li>&#10003; Toppers notes + short notes</li>
                        <li>&#10003; Weekly study plan</li>
                        <li>&#10003; 2 years access</li>
                      </ul>
                    </div>


                  </div>
                </div>
              </div>
            </div>
            {/* /////////////////////// */}
            {/* <div className="price-ltd">
              <h1>Discount Ends In</h1>
              <div className="price-ltd-timer">
                <h2><span>{Hrs} </span>Hrs : <span>{mins} </span>Mins : <span>{seconds} </span>Secs</h2>
              </div>
            </div> */}
            <img className="sales-img" src={sales}></img>
            {/* /////////////////////// */}
          </div>

        </div>
      </div>
    </>
  )
}

export default Pricing
