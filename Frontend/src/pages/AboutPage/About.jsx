import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import AboutUs from '../../Components/About Us/AboutUs'
import AboutUs2 from '../../Components/AboutUs2/AboutUs2'
import Footer from '../../Components/Footer/Footer'
import AboutTitle from '../../Components/AboutTitle/AboutTitle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const About = () => {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <AboutTitle />
        <AboutUs />
        <AboutUs2 />
        <Footer />
      </div>
    </div>
  )
}

export default About;