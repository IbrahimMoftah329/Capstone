import React from 'react';
import './About.css';
import AboutTitle from '../../Components/AboutTitle/AboutTitle'
import AboutUs from '../../Components/About Us/AboutUs'
import AboutUs2 from '../../Components/AboutUs2/AboutUs2'

const About = () => {
  return (
    <div>
      <div className='container'>
        <AboutTitle />
        <AboutUs />
        <AboutUs2 />
      </div>
    </div>
  )
}

export default About;