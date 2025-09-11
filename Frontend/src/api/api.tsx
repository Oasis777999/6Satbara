import axios from 'axios';

const api = axios.create({
    baseURL:"https://sixsatbara.onrender.com"
})

export default api;