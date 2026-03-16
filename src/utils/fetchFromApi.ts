import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const defaultParams: Record<string, string> = {
  maxResults: '50',
};

const headers = {
  'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
  'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
};

export const fetchFromAPI = async (
  url: string,
  extraParams?: Record<string, string>
) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, {
    params: { ...defaultParams, ...extraParams },
    headers,
  });
  return data;
};