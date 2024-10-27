import React from 'react';
import { BsSuitDiamondFill } from "react-icons/bs";
import './DashContent.css'; // Make sure the CSS file path is correct
import { useUser } from '@clerk/clerk-react';

const DashShuffle = () => {
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) {
        return;
    }

    return (
        <div className="content">
            <h1 className="content-title">Shuffle <BsSuitDiamondFill /> </h1>
        </div>
    );
};

export default DashShuffle;