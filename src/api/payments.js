import api from "./index";
import endPoints from "./endPoints";

const getPlans = async () => {
  return await api.get(endPoints.plans);
};

const stripeRedirect = (id) => {
  return api.get(endPoints.stripe);
};


export { getPlans, stripeRedirect };
