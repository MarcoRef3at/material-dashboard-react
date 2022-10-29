import axios from "./index";
import endPoints from "./endPoints";

const getCrons = () => {
  let userToken = localStorage.getItem("TOKEN");
  return axios.get(endPoints.crons, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    }
  });
};

const deleteCron = (uuid) => {
  return axios.delete(`${endPoints.crons}/${uuid}`);
};

const createCron = (name, api, requestType, cronTime, body, headers) => {
  let rqbody = ({
    name, api, requestType, cronTime,
    ...(headers && { headers }),
    ...(body && { body })
  });
  return axios.post(endPoints.crons, rqbody);
};

const updateCron = (uuid, name, api, requestType, cronTime, body, headers) => {
  let rqbody = ({
    name, api, requestType, cronTime,
    ...(headers && { headers }),
    ...(body && { body })
  });
  return axios.patch(`${endPoints.crons}/${uuid}`, rqbody);
};

export {
  getCrons,
  deleteCron,
  createCron,
  updateCron
};
