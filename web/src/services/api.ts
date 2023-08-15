import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export interface UserData {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

export const uploadCSV = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.post(`${BASE_URL}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCSVData = async (searchTerm: string): Promise<UserData[]> => {
  try {
    const response = await axios.get<UserData[]>(`${BASE_URL}/users?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
