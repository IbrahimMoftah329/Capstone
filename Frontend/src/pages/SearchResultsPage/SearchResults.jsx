import React from 'react';
import './SearchResults.css';
import { useLocation } from 'react-router-dom';
import ResultsDeck from '../../Components/ResultsDeck/ResultsDeck';

const SearchResults = () => {

  return (
    <div classname = "results-container">
      <h1 className='results-title'>Search Results</h1>
      <ResultsDeck/>

    </div>
    
  );



};

export default SearchResults;
