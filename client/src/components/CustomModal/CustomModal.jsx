import React from 'react'
import {FaTimes } from "react-icons/fa"
import "./custommodal.scss"


export default function CustomModal({title, children, isOpen, setIsOpen, handleSubmit, button = "Save", danger = false, size = ""}) {
  return (
    <div className={`customModal ${isOpen ? "active" : ""} `}>
      <div className="customModalOverlay" onClick={() => setIsOpen(false)}></div>
      <div className={`customModalContainer ${size}`}>
        <div className="customModalHead">
          <p>{title}</p>
          <div className="close" onClick={() => setIsOpen(false)}><FaTimes></FaTimes></div>
        </div>
        <div className="customModalContent">
          {children}
        </div>
        <div className="customModalFooter">
          <button className={`${danger ? 'sec' : 'pri'}`} onClick={handleSubmit}>{button}</button>
          <button className='clo' onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  )
}
