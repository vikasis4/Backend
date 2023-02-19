import './App.css';
import './mobile.css';
import React, { useState } from 'react'
import HomePageO from './components/homePageLO/HomePageO';
import Navbar from './components/navbar/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import VideosPage from './components/course/VideosPage';
import Player from './components/course/Player'
import { Route, Routes, useLocation } from 'react-router-dom';
import About from './components/about/About';
import { useEffect, useContext } from 'react';
import ProfileContext from './context/profile/ProfileContext';
import VerifyContext from './context/verify/VerifyContext';
import ProfilePage from './components/profile/ProfilePage';
import Forgot from './components/auth/Forgot'
import Blogs from './components/blogs/Blogs'
import Pricing from './components/pricing/Pricing'
import Support from './components/support/Support'
import Selections from './components/selections/Selection'
import Footer from './components/footer/Footer'
import Contact from './components/contact/Contact'
import Refral from './components/refral/Refral'
import Refund from './components/refund/Refund'
import Condition from './components/conditions/Condition'
import Personal from './components/personal/Personal'
import Privacy from './components/privacy/Privacy'
import ScrollTop from './ScrollTop.js'
import Checkout from './components/checkout/Checkout'
import Courses from './components/courses/Courses'
import Books from './components/books/Books'
import Task from './components/activeHome/Task';
import Explore from './components/explore/Explore';
import ActiveHome from './components/activeHome/ActiveHome';
import axios from 'axios';
import io from 'socket.io-client';
import { Helmet } from 'react-helmet';
import VideoCall from './components/videocall/VideoCall';
import MeetRoom from './components/videocall/MeetRoom';
import RefAdmin from './components/refral-admin/RefAdmin';
import Form from './components/form/Form';
import RefLink from './components/refral-admin/RefLink';
import ShowMat from './components/course/ShowMat';

// var socket = io('http://localhost:8080/normal', { transports: ["websocket"] });
var socket = io('https://wbb.rankboost.live/normal', { transports: ["websocket"] });

function App() {
  


  const duework = useContext(ProfileContext);
  const verify = useContext(VerifyContext);
  const location = useLocation();
  const clink = process.env.REACT_APP_LINK;
  const NonApiLink = process.env.REACT_APP_VIDEO_LINK;

  ///////////////////////// WEB SOCKETS ////////////////////////////////////////////////////////////

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  var emailed = duework.profile.username === '' ? 'null' : duework.profile.username;

  useEffect(()=>{
    if (emailed.length > 2) {
      socket.emit('update-cont-new', {id:socket.id, email:emailed});
    }
  },[emailed])

  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true);
        socket.emit('update-cont', {id:socket.id, email:emailed});
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // document.addEventListener('contextmenu', event => event.preventDefault());
  // document.onkeydown = function (e) {
  //   if (e.keyCode == 123) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
  //     return false;
  //   }
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  var timer;
  var seconds = 0;

  useEffect(() => {
    timer = setInterval(() => {
      seconds = seconds + 1;
      if (seconds === 15) {
        if (duework.profile.void === 'no') {
          regrefresh()
        } else {
          refresh()
        }
        seconds = 0;
      }
    }, 1000)
    return () => clearInterval(timer)
  })
  
  const refresh = () => {
    var livetoken;
    if (localStorage.getItem('livefresh')) {
      livetoken = localStorage.getItem('livefresh')
    } else {
      var sys1 = Math.floor(100000 + Math.random() * 900000);
      var sys2 = Math.floor(100000 + Math.random() * 900000);
      var sys3 = Math.floor(100000 + Math.random() * 900000);
      var sys4 = Math.floor(100000 + Math.random() * 900000);
      var sys5 = Math.floor(100000 + Math.random() * 900000);
      var sys6 = Math.floor(100000 + Math.random() * 900000);
      var final = sys1 + sys2 + sys3 + sys4 + sys5 + sys6;
      localStorage.setItem('livefresh', final)
      livetoken = final
    }
    const date = new Date();
    const mins = date.getMinutes().toString();
    const secs = date.getSeconds().toString();
    var topG = secs.length === 1 ? 'x'+secs : secs;
    var sum = mins.length === 1 ? 'x'+mins+':'+topG : mins+':'+topG
    var username = duework.profile.username
    axios.post(clink + '/traffic/tracker', { livetoken, sum, type: "non-reg", username })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const regrefresh = () => {
    const date = new Date();
    const mins = date.getMinutes().toString();
    const secs = date.getSeconds().toString();
    var topG = secs.length === 1 ? 'x'+secs : secs;
    var sum = mins.length === 1 ? 'x'+mins+':'+topG : mins+':'+topG
    var username = duework.profile.username
    const livetoken = duework.profile.username
    axios.post(clink + '/traffic/tracker', { livetoken, sum, type: "reg", username })

  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {

    if (localStorage.getItem('token')) {
      duework.setDisp('block')
    }
    verify.Runverify('/');
    // eslint-disable-next-line
  }, [])


  if (typeof window !== 'undefined') {

    return (
      <div style={{ height: '100%' }} className="App">
        <Helmet>
          <title>RankBoost - Jee Guidance platform</title>
          <meta name="description" content="Rankboost is a  iit jee guidance & mentorship platform for iit jee, Rankboost aslo provide personal 1-1 guidance and study material. Rankboost is well known for its quality service and high quality iit jee guidance courses" />
          <meta name="keywords" content="rankboost guidance iit jee mentorship jee-study-material iit-jee iitjee rankboost rankboost" />
        </Helmet>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Navbar />} >
            <Route index element={<HomePageO />} />
            <Route path="/register" element={<Register />} />
            <Route path="/material" element={<VideosPage />} />
            <Route path="/course" element={<ActiveHome />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/guidance-personal" element={<Personal />} />
            <Route path="/refral" element={<Refral />} />
            <Route path="/player" element={<Player />} />
            <Route path="/paper" element={<ShowMat />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/refral-admin" element={<RefAdmin />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/selections" element={<Selections />} />
            <Route path="/support" element={<Support />} />
            <Route path="/course-form" element={<Form />} />
            <Route path="/task" element={<Task />} />
            <Route path="/price" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/books" element={<Books />} />
            <Route path="/condition" element={<Condition />} />
            <Route path="/videocall" element={<VideoCall />} />
            <Route path="/videocall/:roomId" element={<MeetRoom />} />

            <Route path="/refral-link-AdSense1" element={<RefLink id="AdSense1" />} />
            
          </Route>
        </Routes>
        {window.innerWidth < 480 ?
          location.pathname === '/course' || location.pathname === '/forgot' || location.pathname === '/paper' || location.pathname === '/price' || location.pathname === '/blogs' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/support' || location.pathname === '/material' || location.pathname === '/explore' || location.pathname === '/task' ? '' : <Footer />
          :
          location.pathname === '/course' || location.pathname === '/blogs' ? '' : <Footer />
        }
      </div>
    );
    // document loaded  
  }
}

export default App;
