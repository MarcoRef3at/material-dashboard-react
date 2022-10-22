import axios from "axios";


const getToken = () => {
  let userToken = localStorage.getItem("TOKEN");
  const Authorization = {
    Authorization: `Bearer ${userToken}`,
  };
  return Authorization;
};

const apiClient = axios.create({
  baseURL: "https://69dc-197-58-82-144.ngrok.io",
  // baseURL: process.env.BASE_URL,
  headers: {
    ...getToken(),
    "Content-Type": "application/json",
  },
});

export default apiClient;
