import React from 'react';
import { BsSuitDiamondFill } from "react-icons/bs";
import './DashContent.css'; // Make sure the CSS file path is correct

const DashSettings = () => {
    return (
        <div className="content">
            <h1 className="content-title">Profile<BsSuitDiamondFill /> </h1>
            <h2>Personal Info</h2>
            <br></br>
            <h3>Full Name</h3>
            <input type='text' className='input' value="Isaac Newton"/>
            <br></br>
            <h3>Birthday</h3>
            <input type='text' className='input' value="January 4, 2001"/>
            <br></br>
            <h3>Gender</h3>
            <input type='text' className='input' value="Male"/>
            <br></br>
            <h3>Campus</h3>
            <input type='text' className='input' value="Hunter College"/>
            <br></br>
            <h3>Major</h3>
            <input type='text' className='input' value="Computer Science"/>
            <h3>Email</h3>
            <input type='text' className='input' value="isaacnewt@gmail.com"/>
            <br></br>
            <h3>Password</h3>
            <input type='password' className='input' value="password123"/>
            <br></br>
            <button className="btn">Update</button>
           
        </div>
    );
};

export default DashSettings;