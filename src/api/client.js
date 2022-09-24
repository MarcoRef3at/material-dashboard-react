import axios from "axios";
const apiClient = axios.create({
  baseURL: 'http://localhost:58927',
  // baseURL: process.env.BASE_URL,
  headers: {
    "content-type": "text/json"
  }
});

export default apiClient;
