import client from "./client";
import endPoints from "./endPoints";

const getCrons = () => {
  return client.get(endPoints.crons);
};
const deleteCron = (uuid) => {
  return client.delete(`${endPoints.crons}/${uuid}`);
};
// const register = (email, password) => {
//   let body = JSON.stringify({
//     Mail: email,
//     Pswd: password
//   });

//   return client.post(endPoints.register, body);
// };

export {
  getCrons,
  deleteCron
};
