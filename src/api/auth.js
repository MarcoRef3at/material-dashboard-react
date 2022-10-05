import client from "./index";
import endPoints from "./endPoints";

const login = (email, password) => {
  let body = { email, password };

  return client.post(endPoints.login, body);
};
const register = (email, password) => {
  let body = { email, password };

  return client.post(endPoints.register, body);
};



export {
  login,
  register
};
