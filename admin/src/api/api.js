import axios from "axios";

const api = axios.create({
  // baseURL:"https://api.satbaraa.com", //VPS ackend
  // baseURL:"http://localhost:5000", //Local Backend
  baseURL: "https://sixsatbara.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
