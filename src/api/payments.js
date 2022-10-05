import api from "./index";
import endPoints from "./endPoints";

const getPlans = async () => {
  return await api.get(endPoints.plans);
};

const stripeRedirect = (planId, redirect) => {
  return api.get(endPoints.stripe, { params: { plan: planId, redirect } });
};


export { getPlans, stripeRedirect };
