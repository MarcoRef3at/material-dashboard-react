import endPoints from "./endPoints";
import axios from 'axios'

const client = axios.create({
  baseURL: 'https://81be-197-58-82-144.ngrok.io',
  // baseURL: 'https://tbn5qjckcb.execute-api.us-east-1.amazonaws.com',
  // baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const login = (email, password) => {
  let body = { email, password };

  return client.post(endPoints.login, body);
};
const register = (email, password) => {
  let body = { email, password };

  return client.post(endPoints.register, body);
};
const tokenRefresher = (token) => {
  return client.post(endPoints.tokenRefresher, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export {
  login,
  register,
  tokenRefresher
};
