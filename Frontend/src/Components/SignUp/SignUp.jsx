import React from 'react'
import './SignUp.css'
import spade from '../../assets/spade.jpg'
import heart from '../../assets/heart.jpg'
import club from '../../assets/club.jpg'


const SignUp = () => {
  return (
    <div className='signUp'>
        <div className='col'>
            <h3>Join the Cardmates Family</h3>
            <br></br>
            <p>Join Cardmates, the ultimate learning platform designed to make studying fun and effective. 
                Sign up today to access personalized quizzes and interactive flashcards that will help you master any subject.
                With Cardmates, learning becomes a rewarding experience!
            </p>
            <br></br>
            <p> Have a question? Contact us here.</p>
            <br></br>
            <ul>
                <li><img src= {spade} />cardmates@gmail.com</li>
                <br></br>
                <li><img src= {heart} /> +1 123-456-7890</li>
                <br></br>
                <li><img src= {club} /> 1234 Hunter Ave, Brooklyn, NY 10485, United States</li>
            </ul>
        </div>
        <div className='col'>
            <form>
                <label> Full Name </label>
                <input type='text' name='name' placeholder='Enter your name' required/>
                <label> College/University </label>
                <input type='college' name='school' placeholder='Enter your school' required/>
                <label> Major </label>
                <input type='maj' name='major' placeholder='Enter your major' required/>
                <label> Email </label>
                <input type='email' name='mail' placeholder='Enter your email' required/>
                <label> Create your password </label>
                <input type='pass' name='password' placeholder='Create a password' required/>
                <button type='sign' className='btn dark-btn'>Sign Up</button>
            </form>
        </div>  

    </div>
  )
}

export default SignUp