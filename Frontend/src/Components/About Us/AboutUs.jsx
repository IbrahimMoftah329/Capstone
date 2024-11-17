import React from 'react'
import './AboutUs.css'
import ai from '../../assets/ai.jpg'

const AboutUs = () => {
  return (
    <div className='about'>
        <div className='about-left'>
            <img src={ai} alt='ai' className='ai'/>
        </div>
        <div className='about-right'>
            <h3>Why Us?</h3>
            <h2>AI Powered Learning</h2>
            <p>Our platform leverages cutting-edge AI technology to enhance your 
            learning experience. Our AI algorithms automatically extract keywords 
            from your flashcards and generate a variety of question types tailored to 
            your specific needs.</p>
        </div>

    </div>
   



    )
}

export default AboutUs