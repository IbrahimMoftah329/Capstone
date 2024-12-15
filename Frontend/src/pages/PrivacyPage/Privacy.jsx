import React, { useEffect } from 'react'
import './Privacy.css'

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
    
        <section className="policy-section">
          <h2>Cardmates Privacy Statement</h2>
          <p>We are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data.Welcome to Cardmates, your AI-powered learning companion. We're dedicated to helping students like you master their studies through efficient and engaging flashcards and quizzes.
           Your privacy is our top priority. This Privacy Policy outlines how we collect, use, and protect your personal information as you utilize our platform. By understanding how we handle your data, you can confidently engage with our tools and focus on your academic goals. We value your trust and are committed to providing a secure and transparent learning experience.</p>
        </section>
        
        <section className="policy-section">
          <h2>Information We Collect</h2>
          <ul>
            <li>Personal identification information</li>
            <li>Educational instituition and background</li>
            <li>User Profile Information </li>
            <li> Learning Interaction Data </li>
            <li>Quiz and assessment results</li>
          </ul>
        </section>
        
        <section className="policy-section">
          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <br></br>
          <ul>
            <li>Provide and improve our services</li>
            <li>Personalize user experience</li>
            <li>Verify user identity and create a unique account</li>
            <li>Monitor user progress and identify areas where additional support may be needed</li>
          </ul>
        </section>
        
        <section className="policy-section">
          <h2>Third-Party Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
        </section>  

        <section className="policy-section">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at cardmatesai@gmail.com</p>
        </section>
    
        <div className="policy-footer">
          <p>Last Updated: November 2024</p>
        </div>
      </div>
    </div>
  )
}

export default Privacy