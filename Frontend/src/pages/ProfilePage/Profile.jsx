import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
      <div>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-info">
              <h1>Steve Jobs</h1>
              <button className="edit-button">Edit</button>
              <div className="stats">
                <p><strong>Current Classes:</strong> 260</p>
                <p><strong>Previous Classes:</strong> 135, 150, 235</p>
                <p><strong>Flashcard Sets:</strong> 15</p>
                <p><strong>Quizzes:</strong> 21</p>
                <p><strong>Average Score:</strong> 89%</p>
              </div>
            </div>
          </div>
  
          <div className="decks-section">
            <button className="decks-button">My Decks</button>
            <div className="flashcards">
              <div className="flashcard cs260">
                <p>Hardware</p>
              </div>
              <div className="flashcard cs260">
                <p>Components</p>
              </div>
              <div className="flashcard cs150">
                <p>Proofs</p>
              </div>
              <div className="flashcard cs150">
                <p>Theories</p>
              </div>
            </div>
          </div>
  
          <div className="classes-section">
            <button className="classes-button">Classes</button>
            <div className="classes">
              <div className="class-card">
                <p>CS260</p>
              </div>
              <div className="class-card">
                <p>CS135</p>
              </div>
              <div className="class-card">
                <p>CS150</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;