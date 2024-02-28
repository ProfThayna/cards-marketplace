import axios from 'axios';

const headers = {};

if (localStorage.getItem('token')) {
  headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

export const httpClient = axios.create({
  baseURL: 'https://cards-marketplace-api.onrender.com/',
  headers
});
