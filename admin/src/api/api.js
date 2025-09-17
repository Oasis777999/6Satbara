import axios from "axios";

const api = axios.create({
    baseURL:"https://api.satbaraa.com",
    headers:{
        'Content-Type':'application/json'
    }
})

export default api;