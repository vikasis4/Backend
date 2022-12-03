import React, { useContext, useEffect, useState } from 'react'
import ProfileContext from '../../context/profile/ProfileContext'
import { useNavigate } from 'react-router-dom'
// import {
//   Player, Hls, DefaultUi,
//   Settings,
//   MenuItem,
//   Submenu,
//   MenuRadio,
//   MenuRadioGroup,
// } from '@vime/react';
import axios from 'axios'




const Part = () => {

  const navigate = useNavigate();
  const file = useContext(ProfileContext);
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState(480)
  const [rate, setRate] = useState(1);
  const [pate, setPate] = useState(1);

  const vlink = process.env.REACT_APP_VIDEO_LINK
  const clink = process.env.REACT_APP_LINK


  useEffect(() => {
    setQuality(file.profile.quality)
  },[])

  useEffect(() => {
    setUrl(`${vlink}/course/${file.profile.current.category}/${file.profile.current.bname}/v${quality}p/index.m3u8`);
    if (file.profile.subscription === 'false') {
      navigate('/')
    }
  
    if (file.profile.quality === quality) {
      ////////
    }else{
      setRate(1)
      axios.post(clink+'/update/quality',{id:file.profile.id, quality})
    }
  }, [quality]);

  var value = quality + 'p'
  var balue = rate + "x"
  const hlsConfig = {
    // ...
  };


  return (
    <>
      {/* <Player volume={100} playbackRate={rate}>

        <Hls version="latest" config={hlsConfig} poster="/media/poster.png">
          <source data-src={url} type="application/x-mpegURL" />
        </Hls>



        <DefaultUi noSettings>
          <Settings>
            <MenuItem
              label="Rank boost"
              badge="Beta"
            />
            <Submenu label="playback speed" hint={balue} >
              <MenuRadioGroup value={balue} >
                <MenuRadio onClick={() => { setRate(0.5) }} label="0.50x" value="1" />
                <MenuRadio onClick={() => { setRate(0.2) }} label="0.25x" value="2" />
                <MenuRadio onClick={() => { setRate(1) }} label="1x" value="3" />
                <MenuRadio onClick={() => { setRate(1.5) }} label="1.50x" value="5" />
                <MenuRadio onClick={() => { setRate(2) }} label="2x" value="7" />
              </MenuRadioGroup>
            </Submenu>

            <Submenu label="video quality" hint={value} >
              <MenuRadioGroup value={value} >
                <MenuRadio onClick={() => { setQuality(144) }} label="144p" value="1" />
                <MenuRadio onClick={() => { setQuality(240) }} label="240p" value="2" />
                <MenuRadio onClick={() => { setQuality(360) }} label="360p" value="3" />
                <MenuRadio onClick={() => { setQuality(480) }} label="480p" value="4" />
                <MenuRadio onClick={() => { setQuality(720) }} label="720p" value="5" />
                <MenuRadio onClick={() => { setQuality(1080) }} label="1080p" value="6" />
              </MenuRadioGroup>
            </Submenu>
          </Settings>
        </DefaultUi>
      </Player>
 */}

    </>
  )
}

export default Part