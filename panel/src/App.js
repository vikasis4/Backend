import React, { useContext, useEffect } from 'react'
import './App.css';
import Navbar from './components/navbar/Navbar'
import Videos from './components/videos/Videos'
import Query from './components/query/Query'
import Auth from './components/auth/Auth'
import Payment from './components/transactions/Payment'
import { Routes, Route } from 'react-router-dom'
import PanelContext from './context/panelentry/PanelContext'
import Blogs from './components/blogs/Blogs'
import Personal from './components/personal/Personal'
import Variables from './components/variables/Variables'

function App() {


  const panel = useContext(PanelContext)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route index element={<Auth />} />
          <Route path={panel.verify === true ? '/query' : '/098hcygeiygbgt2g27cg'} element={<Query />} />          
          <Route path={panel.verify === true ? '/video' : '/098hcygeiyvwecgg27cg'} element={<Videos />} />
          <Route path={panel.verify === true ? '/payment' : '/098hcygvewgbgg27cg'} element={<Payment />} />
          <Route path={panel.verify === true ? '/blogs' : '/dedcgiegcdeiycgdddic'} element={<Blogs />} />
          <Route path={panel.verify === true ? '/personal' : '/dedcgiegcdeiycgdddsd'} element={<Personal />} />
          <Route path={panel.verify === true ? '/variable' : '/dedcgiegbuiycdedddsd'} element={<Variables />} />
          <Route path="/:id" element={<Auth />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
