import axios from "axios";


const getToken = () => {
  let userToken = localStorage.getItem("TOKEN");
  const Authorization = {
    Authorization: `Bearer ${userToken}`,
  };
  return Authorization;
};

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: process.env.BASE_URL,
  headers: {
    ...getToken(),
    "Content-Type": "application/json"
  }
});

export default apiClient;
