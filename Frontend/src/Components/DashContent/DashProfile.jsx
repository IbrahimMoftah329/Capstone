import React, { useState, useEffect } from 'react';
import { IoIosHeart } from "react-icons/io";
import './DashContent.css'; // Make sure the CSS file path is correct
import { useUser } from '@clerk/clerk-react';

const DashProfile = () => {
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) {
        return;
    }
    
    const [username, setUsername] = useState(user?.username || '');
    const [university, setUniversity] = useState(user?.university || '');
    const [major, setMajor] = useState(user?.major || '');
    const [showPopup, setShowPopup] = useState(false);

    // Function to update user profile
    const updateUserProfile = async (event) => {
        event.preventDefault();

        const updatedData = {
            username,
            university,
            major,
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                // Show popup message on success
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
            } else {
                const errorText = await response.text();
                console.error("Failed to update user profile:", errorText);
            }
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    };

    const getUserInfo = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/users/${user.id}`)
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username || '');
                setUniversity(data.university || '');
                setMajor(data.major || '');
            })
            .catch(error => console.error("Error fetching user info:", error));
    };


    useEffect(() => {
        getUserInfo();
    }, [user]);

    return (
        <div className="content">
            <h1 className="content-title">Profile < IoIosHeart /> </h1>
            <form className="profile-box" onSubmit={updateUserProfile}>
                <h3>UserName</h3>
                <input type='text' className='input' value={username} onChange={(e) => setUsername(e.target.value)} required placeholder='Enter UserName'  />
                <br />
                <h3>university</h3>
                <input type='text' className='input' value={university} onChange={(e) => setUniversity(e.target.value)} required placeholder='Enter university'  />
                <br />
                <h3>Major</h3>
                <input type='text' className='input' value={major} onChange={(e) => setMajor(e.target.value)} required placeholder='Enter Major'  />
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