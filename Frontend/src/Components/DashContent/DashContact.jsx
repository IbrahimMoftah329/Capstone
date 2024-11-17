import React, { useState } from 'react';
import { GiClubs } from "react-icons/gi";
import './DashContent.css'; // Make sure the CSS file path is correct
import { useUser } from '@clerk/clerk-react';

const DashContact = () => {
    const { user } = useUser();
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleUpdateClick = async (event) => {
        event.preventDefault();
        setShowPopup(true);
    
        // Send form data to the backend to send the email
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'cardmatesai@gmail.com', // Main recipient email
                    subject: `Contact Form Message from ${formData.name}`,
                    text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}\nUserID: ${user.id}`,
                    userEmail: formData.email, // User's email for confirmation
                    userName: formData.name // User's name for confirmation
                }),
            });
    
            if (!response.ok) throw new Error('Error sending email');
            console.log("Email successfully sent to both CardMates and the user.");
    
            // Clear form fields upon successful submission
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error("Error occurred during email submission:", error);
        }
    
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
                        <input type='text' id = "name" className='input' required placeholder='Enter name' value={formData.name} onChange={handleInputChange} />

                        <h3>Email</h3>
                        <input type='text' id = "email" className='input' required placeholder='Enter email' value={formData.email} onChange={handleInputChange} />

                        <div className='name'>
                            <h3>Message</h3>
                            <textarea id= "message" rows="8" className='input' required placeholder='Enter message' value={formData.message} onChange={handleInputChange} />
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