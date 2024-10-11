import React, { useState } from 'react';
import './Dashboard.css';
import DashSidebar from '../../Components/DashSidebar/DashSidebar';
import DashContent from '../../Components/DashContent/DashContent';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('Home');

  // Function to update the content based on sidebar selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex' }}>
      <DashSidebar onSelectItem={handleItemSelect} />
      <DashContent selectedItem={selectedItem} />
    </div>
  );
};
  
  export default Dashboard;