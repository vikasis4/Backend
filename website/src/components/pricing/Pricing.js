import React, { useContext, useState, useEffect } from 'react'
import ProfileContext from "../../context/profile/ProfileContext";
import { useNavigate } from 'react-router-dom'
import './price.css'
import two from './two.jpg'
import four from './imghector.png'
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
        else if (array[i].name === 'combo' || array[i].name === '2023CC') {
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
  const [mins, setMins] = useState(60 - ds.getMinutes())
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



                  <div className="pd_card pd_card_combo">
                    <div className="pd_card_one pd_cambo">
                      <div className="pd_card_useless">
                        <h6>Best Deal</h6>
                      </div>
                      <img src={four}></img>
                      <h1>JEE Mains + Advance 2023 Mentorship</h1>
                    </div>
                    <div className="pd_card_two">
                      <div className="pd_card_slab pd_slab_combo">
                        <h4>Discounted price  &nbsp; &#8377; 999 only</h4>
                        <h3>Flat 85% off</h3>
                          <span className="pd_h6 pd_combo_h6">
                            {variables.var5} students enrolled
                          </span>
                        <div className="pd_control_buttons">
                          {
                            statee === true ?
                              <button onClick={() => { profile.setCurrent('2023CC'); navigate('/course'); }} >Go to course</button>
                              :
                              cart.find(({ name }) => name === "2023CC") ?
                                <>
                                  <button onClick={() => { navigate("/explore") }} >Explore</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('2023CC') }} >Buy now</button>
                                </>
                                :
                                <>
                                  <button onClick={() => { navigate("/explore") }} >Explore</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('2023CC') }} >Buy now</button>
                                </>
                          }
                        </div>

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
                        <h4>Discounted price  &nbsp; &#8377; 499 only</h4>
                        <h3>Flat 75% off</h3>
                        <span className="pd_h6">
                          {variables.var3} students enrolled
                        </span>
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
                    <img className="price-img" src={two}></img>
                    <div className="price-cbtwn">
                      <p className="price-head">Study Material</p>
                      <div className="price-tag">
                        <h5><span > Original price  &nbsp; &#8377; 2000</span></h5>
                        <h4><span > Discounted price  &nbsp; &#8377;499 only</span></h4>
                        <h3 className="price-call"><img className="price-call-img" src={medal}></img>Flat 75% off</h3>
                        <span className="price-h6">
                          {variables.var3} students enrolled
                        </span>
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
                  </div>
                </div>
               
              </div>
            </div>


            <div className="price-flex price-spl">
              <div className="price-mod mob-price-mod">
                <div className="price-cardd">
                  {/* <img className="price-deal" src={deals}></img> */}
                  <div className="price-first-coursed">
                    <img className="price-first-coursed-img" src={four}></img>
                    <div className="price-cbtwn">
                      <div className="price-tag">
                        <p className="price-head">JEE 2023 Mains + Advance </p>
                        <h5><span > Original price  &nbsp; &#8377; <strike>4,000</strike></span></h5>
                        <h4><span > Discounted price  &nbsp; &#8377;999 only</span></h4>
                        <h3 className="price-call"><img className="price-call-img" src={medal}></img>Flat 85% off</h3>

                        <span className="price-h6">
                          {variables.var5} students enrolled
                        </span>

                        <div className="price-cbt-panel">
                          {
                            statee === true ?
                              <button onClick={() => { profile.setCurrent('2023CC'); navigate('/course'); }} className="price-main-half-btn">Go to course</button>
                              :
                              cart.find(({ name }) => name === "2023CC") ?
                                <>
                                  <button onClick={() => { navigate("/checkout") }} className="price-main-half-btn">Go to cart</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('2023CC') }} className="price-main-half-btn">Buy now</button>
                                </>
                                :
                                <>
                                  <button onClick={() => { navigate('/explore') }} className="price-main-half-btn">Explore</button>
                                  <button onClick={() => { navigate('/checkout'); updatecart('2023CC') }} className="price-main-half-btn">Buy now</button>
                                </>
                          }
                        </div>


                      </div>
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
