import React from 'react'
import './AboutUs2.css'
import logo from '../../assets/logo.png'

const AboutUs2 = () => {
  return (
    <div className='about2'>
        <div className='about-left2'>
            <h2>Personalized Flashcards and Quizzes</h2>
            <p>Our customizable quizzing platform allows you to 
            organize your studies by course and tailor your study 
            sessions to your specific learning style and goals, making 
            it easy to navigate and track your progress. Take control of your learning journey today.</p>
        </div>
        <div className='about-right2'>
        <img src={logo} className='logo' />
        </div>


    </div>
   



    )
}

export default AboutUs2