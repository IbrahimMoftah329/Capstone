import React from 'react';
import { GiCardJoker } from "react-icons/gi";
import './DashContent.css'; // Make sure the CSS file path is correct
import { useUser } from '@clerk/clerk-react';

const DashShuffle = () => {
    const { user } = useUser();
    return (
        <div className="content">
            <h1 className="content-title">Shuffle <GiCardJoker /> </h1>
        </div>
    );
};

export default DashShuffle;