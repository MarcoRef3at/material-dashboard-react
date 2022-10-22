import api from "./index";
import endPoints from "./endPoints";

const getLogs = (cronUUID, limit) => {
  return api.post(endPoints.logs, null, { params: { cronUUID, limit } });
};


export { getLogs };
