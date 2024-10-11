import React, { useState } from 'react';
import './Profile.css';
import ProfSidebar from '../../Components/ProfSidebar/ProfSidebar';
import ProfContent from '../../Components/ProfContent/ProfContent';

const Profile = () => {
  const [selectedItem, setSelectedItem] = useState('Home');

  // Function to update the content based on sidebar selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex' }}>
      <ProfSidebar onSelectItem={handleItemSelect} />
      <ProfContent selectedItem={selectedItem} />
    </div>
  );
};
  
  export default Profile;