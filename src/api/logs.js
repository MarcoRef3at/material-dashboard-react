import api from "./index";
import endPoints from "./endPoints";

const getLogs = (cronUUID, limit) => {
  return api.get(endPoints.logs, { params: { cronUUID, limit } });
};


export { getLogs };
