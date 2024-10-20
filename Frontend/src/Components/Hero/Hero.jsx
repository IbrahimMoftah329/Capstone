import React from 'react';
import { Link } from 'react-scroll';
import './Hero.css';
import { SignedOut } from '@clerk/clerk-react';

const Hero = () => {
  return (
    <div className='hero container'>
      <div className="hero-text">
        <h1>Learn faster with Cardmates</h1>
        <p>We cannot change the cards we are dealt, just how we play the hand.</p>
        <SignedOut>
          <Link to="signUp" smooth={true} offset={0} duration={500} className="signupbutton" >Sign Up</Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default Hero;