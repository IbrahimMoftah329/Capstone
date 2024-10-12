import React from 'react';
import './SignUp.css';
import spade from '../../assets/spade.jpg';
import heart from '../../assets/heart.jpg';
import club from '../../assets/club.jpg';
import { SignUp } from '@clerk/clerk-react';

const SignUpComponent = () => {
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
          <li><img src={spade} alt="spade" className="small-image" />cardmates@gmail.com</li>
          <br></br>
          <li><img src={heart} alt="heart" className="small-image" /> +1 123-456-7890</li>
          <br></br>
          <li><img src={club} alt="club" className="small-image" /> 1234 Hunter Ave, Brooklyn, NY 10485, United States</li>
        </ul>
      </div>
      <div>
        {/* Clerk SignUp component replaces the custom form */}
        <SignUp /> 
      </div>  
    </div>
  );
}

export default SignUpComponent;
