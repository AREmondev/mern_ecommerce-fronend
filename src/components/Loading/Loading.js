import React from 'react'
import img from '../../img/loading.gif'
import './Loading.css'
function Loading() {
  return (
    <div className="loading">
      <img style={{ width: '50px' }} src={img} alt="" />
    </div>
  )
}

export default Loading
