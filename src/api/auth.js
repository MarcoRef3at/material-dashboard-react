import endPoints from "./endPoints";
import axios from 'axios'

const client = axios.create({
  // baseURL: 'https://597b-197-58-118-8.ngrok.io',
  baseURL: 'https://tbn5qjckcb.execute-api.us-east-1.amazonaws.com',
  // baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
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

  return client.get(endPoints.tokenRefresher, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};



export {
  login,
  register,
  tokenRefresher
};
