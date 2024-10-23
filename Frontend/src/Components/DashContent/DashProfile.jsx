import React, { useState } from 'react';
import './DashContent.css'; // Make sure the CSS file path is correct
import { BsSuitDiamondFill } from "react-icons/bs";

const DashProfile = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleUpdateClick = (event) => {
        // Prevent the form from submitting if there's an actual submit behavior in the future
        event.preventDefault();

        // Show the popup when the button is clicked
        setShowPopup(true);

        // Hide the popup after 3 seconds (optional)
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
        <div className="content">
            <h1 className="content-title">Profile < BsSuitDiamondFill /> </h1>
            <form className="profile-box" onSubmit={handleUpdateClick}>
                <h3>UserName</h3>
                <input type='text' className='input' required placeholder='Enter Username'  />
                <br />
                <h3>Campus</h3>
                <input type='text' className='input' required placeholder='Enter Campus'  />
                <br />
                <h3>Major</h3>
                <input type='text' className='input' required placeholder='Enter Major'  />
                <br />
                <button type="submit" className="btn">Update</button>
            </form>
            {showPopup && (
                <div className="popup">
                    <p>Profile updated successfully!</p>
                </div>
            )}
        </div>
    );
};


export default DashProfile;