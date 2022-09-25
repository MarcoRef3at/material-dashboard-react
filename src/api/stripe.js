import api from "./index";
import endPoints from "./endPoints";

const stripeRedirect = (id) => {
    return api.get(endPoints.stripe);
};


export { stripeRedirect };
