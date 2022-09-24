import client from "./client";
import endPoints from "./endPoints";

const getCrons = () => {
  return client.get(endPoints.crons);
};
const deleteCron = (uuid) => {
  return client.delete(`${endPoints.crons}/${uuid}`);
};



const createCron = (name, api, requestType, cronTime, body, headers) => {
  let rqbody = ({
    name, api, requestType, cronTime,
    ...(headers && { headers }),
    ...(body && { body })
  });
  return client.post(endPoints.crons, rqbody);
};

const updateCron = (uuid, name, api, requestType, cronTime, body, headers) => {
  console.log('uuid:', uuid)
  let rqbody = ({
    name, api, requestType, cronTime,
    ...(headers && { headers }),
    ...(body && { body })
  });
  return client.patch(`${endPoints.crons}/${uuid}`, rqbody);
};

export {
  getCrons,
  deleteCron,
  createCron,
  updateCron
};
