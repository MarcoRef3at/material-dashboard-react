import api from "./index";
import endPoints from "./endPoints";

const getLogs = (pageKey) => {
  return api.post(endPoints.logs, null, { params: pageKey});
};


export { getLogs };
