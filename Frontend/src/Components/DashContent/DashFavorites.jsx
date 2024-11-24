import React, { useState, useEffect } from 'react';
import { BsSuitDiamondFill } from "react-icons/bs";
import './DashContent.css'; // Make sure the CSS file path is correct
import { useUser } from '@clerk/clerk-react';

const DashFavorites = () => {
    const { user } = useUser();

    return (
        <div className="content">
            <h1 className="content-title">Favorites < BsSuitDiamondFill /> </h1>
        </div>
    );

    
};


export default DashFavorites;