import axios from "axios";


const getToken = () => {
  let userToken = localStorage.getItem("TOKEN");
  const Authorization = {
    Authorization: `Bearer ${userToken}`,
  };
  return Authorization;
};

const apiClient = axios.create({
  // baseURL: 'https://597b-197-58-118-8.ngrok.io', //this one is talking to my laptop
  baseURL: 'https://tbn5qjckcb.execute-api.us-east-1.amazonaws.com', // this one to the deployed server on amazon
  // baseURL: process.env.BASE_URL,
  headers: {
    ...getToken(),
    "Content-Type": "application/json"
  }
});

export default apiClient;
