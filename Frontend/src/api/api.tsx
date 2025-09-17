import axios from 'axios';

const api = axios.create({
    baseURL:"https://api.satbaraa.com/"
})

export default api;