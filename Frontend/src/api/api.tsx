import axios from "axios";

const api = axios.create({
  baseURL:"https://api.satbaraa.com", //VPS ackend
  // baseURL: "http://localhost:6000", //Local Backend
  // baseURL: "https://sixsatbara.onrender.com", //Local Backend
});

export default api;
