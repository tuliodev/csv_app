import React, { useEffect, useState } from 'react';

import CSVReader from '../components/CsvReader';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { getCSVData, UserData } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Grid } from '@mui/material';

const Home: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);

  const handleData = (csvData: UserData[]) => {
    setData(csvData);
  };

  useEffect(() => {
    async function fetchData() {
      const initialData = await getCSVData('');
      setData(initialData);
    }
    fetchData();
  }, [])

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>CSV Search App</h1>
          <CSVReader onDataLoaded={handleData} />
        </Grid>
        <Grid item xs={12}>
          <SearchBar data={data} setData={setData} />
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={2}>
            {data && data.map((row, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card data={row} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default Home;
