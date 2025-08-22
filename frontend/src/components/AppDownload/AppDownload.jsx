import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'



const AppDownload = () => {
  return (
    <div className='app-download' id='app-download' >
        <hr />
        <br />
      <p>For Better Experience Download<br/>Shopo App</p>
      <div className="add-download-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
      <br />
      <hr />
      <br />
    </div>
  )
}

export default AppDownload
