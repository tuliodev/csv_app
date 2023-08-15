import React, { useRef } from 'react';
import { UserData, getCSVData, uploadCSV } from '../services/api';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { Button } from '@mui/material';

interface CSVReaderProps {
  onDataLoaded: (data: UserData[]) => void;
}

const CSVReader: React.FC<CSVReaderProps> = ({ onDataLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function fetchData() {
    const data = await getCSVData('');
    onDataLoaded(data);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      uploadCSV(file)
        .then((response: AxiosResponse) => {
          fetchData();
        })
        .catch((error: AxiosError) => {
          console.error('Error uploading CSV:', error);
          toast.error('Error uploading CSV');
          onDataLoaded([]);
        });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button variant="contained" color="primary" onClick={() => fileInputRef.current?.click()}>
        Load CSV
      </Button>
    </div>
  );
};

export default CSVReader;
