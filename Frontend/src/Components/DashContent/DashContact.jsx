import React, { useState } from 'react';
import { GiClubs } from "react-icons/gi";
import './DashContent.css'; // Make sure the CSS file path is correct
import { useUser } from '@clerk/clerk-react';

const DashContact = () => {
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) {
        return;
    }

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
            <h1 className="content-title">Contact Us <GiClubs /></h1>
            <p> Need help? Get in touch. </p>
            <br></br>
            <div className="profile-box">
                <div className='form'>
                    <form onSubmit={handleUpdateClick}>
                        <h3>Full name</h3>
                        <input type='text' id = "name" className='input' required placeholder='Enter name'  />

                        <h3>Email</h3>
                        <input type='text' id = "Email" className='input' required placeholder='Enter email'  />

                        <div className='name'>
                            <h3>Message</h3>
                            <textarea id= "message" rows="8" className='input' required placeholder='Enter message'  />
                        </div>

                        <button className="btn">Submit</button>
                    </form>
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <p>Contact form successfully sent!</p>
                </div>
            )}

        </div>
    );
};


export default DashContact;