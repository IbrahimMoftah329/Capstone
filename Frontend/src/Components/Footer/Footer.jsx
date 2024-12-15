import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate();

  const handleRoute = (path) => {
    navigate(path);
  };

  return (
    <div className='footer'>
        <p>© 2024 Cardmates. All rights reserved. </p>
        <ul>
            <li onClick={() => handleRoute('../terms')}>
                Terms of Service
            </li>
            <li onClick={() => handleRoute('../privacy')}>
                Privacy Policy
            </li>
        </ul>
    </div>
  )
}

export default Footer