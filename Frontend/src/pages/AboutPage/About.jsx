import React from 'react';
import './About.css';
import AboutTitle from '../../Components/AboutTitle/AboutTitle'
import AboutUs from '../../Components/About Us/AboutUs'
import AboutUs2 from '../../Components/AboutUs2/AboutUs2'
import Carousel from '../../Components/DashContent/Carousel';

const About = () => {
  return (
    <div>
      <div className='container'>
        <AboutTitle />
        <AboutUs />
        <AboutUs2 />
        <Carousel />
      </div>
    </div>
  )
}

export default About;