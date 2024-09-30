import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-scroll';
const Navbar = () => {

  const[bar, setBar] = useState(false);
  useEffect(()=>{
    window.addEventListener('scroll',()=> {
      window.scrollY > 50? setBar(true) : setBar(false);
    })
  }, []);
  
  return (
    <nav className={`container ${bar? 'dark-nav':''}`}> 
       {/* <img src={logo} alt="logo" />    */}
        <h1 className='cm'>Cardmates</h1>
        <ul>
            <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to='about' smooth={true} offset={-260} duration={500}>About Us</Link></li>
            <li><Link to='signUp' smooth={true} offset={-260} duration={500}><button className='button'>Sign Up</button></Link></li>
        </ul>
    </nav>
  )
}

export default Navbar

