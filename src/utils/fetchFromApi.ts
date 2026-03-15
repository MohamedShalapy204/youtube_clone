import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: '50',
  },
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url: string) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};