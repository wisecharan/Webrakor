import axios from 'axios';

// This line reads the VITE_API_URL from your .env.development file (for local)
// or from the environment variables you set on Netlify (for production).
const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;