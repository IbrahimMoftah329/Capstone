import React from 'react';
import './ProfContent.css'; // Make sure the CSS file path is correct

const ProfContent = ({ selectedItem }) => {
    return (
        <div className="content">
            <h1 className="content-title">{selectedItem}</h1>
            <p className="content-description">You selected: {selectedItem}</p>
        </div>
    );
};

export default ProfContent;
  