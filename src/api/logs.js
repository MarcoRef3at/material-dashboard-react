import api from "./index";
import endPoints from "./endPoints";

const getLogs = () => {
  return api.get(endPoints.logs);
};


export { getLogs };
