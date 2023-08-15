import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { getCSVData } from '../services/api'; 

interface SearchBarProps {
  data: any[];
  setData: (data: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, setData }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
    
    try {
      if (searchTerm === '') {
        setData(data); 
      } else {
        const searchData = await getCSVData(searchTerm);
        setData(searchData);
      }
    } catch (error) {
      console.error('Error fetching CSV data:', error);
      setData([]); 
    }
  };

  return (
    <div>
      <TextField
        label="Search CSV data..."
        value={searchText}
        onChange={handleSearch}
        fullWidth
      />
    </div>
  );
};

export default SearchBar;
