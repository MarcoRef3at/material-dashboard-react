import api from "./index";
import endPoints from "./endPoints";

const getLogs = (pageKey) => {
  return api.get(endPoints.logs, { params: pageKey});
};


export { getLogs };
