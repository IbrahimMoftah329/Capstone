import React from 'react';
import { GiClubs } from "react-icons/gi";
import './DashContact.css';

const DashProfile = () => {
    return (
        <div className="content">
            <h1 className="content-title">Contact Us<GiClubs /> </h1>
            <h2>Need help? Get in touch with us.</h2>
            <div className='form'>
            <form>
                <div className='name'>
                <input type='text' id = "name" placeholder='Enter name' />
                <label>Full name </label>
                </div>
                <div className='name'>
                <input type='text' id = "number" placeholder='Enter phone no.' />
                <label>Phone number</label>
                </div>
                <div className='name'>
                <input type='email' id = "email" placeholder='Enter email' />
                <label>Email </label>
                </div>
                <div className='name'>
                    <textarea id= "message" rows="8" placeholder='Enter message'></textarea>
                    <label>Message</label>
                </div>
                <button type='submit'> SUBMIT</button>
            </form>
            </div>

        </div>
    );
};

export default DashProfile;