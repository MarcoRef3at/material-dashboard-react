import Schedulers from './layouts/schedulers'
import Billing from "layouts/billing";
import Monitor from 'layouts/monitor'
import Notifications from "layouts/notifications";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import { Navigate, useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import { tokenRefresher } from 'api/auth';
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children, page }) => {
  const navigate = useNavigate();
  let token = localStorage.getItem("TOKEN");
  useEffect(() => {
    if (!token) {
      localStorage.clear()
      navigate("/authentication/sign-in", { replace: true })
    } else {
    tokenRefresher(token).then(res => {
      const Token = res.data.token
      localStorage.setItem("TOKEN", Token)
      var decoded = jwt_decode(Token);
      localStorage.setItem("cronLimit", decoded.cronLimit);
      localStorage.setItem("cronUsed", decoded.cronUsed);
      localStorage.setItem("isActive", decoded.isActive);
    }).catch(e => {
      if (e.response?.statusText === "Unauthorized")
      {
        localStorage.clear()
        navigate("/authentication/sign-in", { replace: true })
      }
    })
    }
  }, [page])
  return children;
};

const routes = [
  {
    type: "collapse",
    name: "Schedulers",
    key: "schedulers",
    icon: <Icon fontSize="small">schedule</Icon>,
    route: "/schedulers",
    component: <ProtectedRoute page='schedulers'>
      <Schedulers />
    </ProtectedRoute>
  },
  {
    type: "collapse",
    name: "Monitor",
    key: "monitor",
    icon: <Icon fontSize="small">dvr</Icon>,
    route: "/monitor",
    component: <ProtectedRoute page={'monitor'}>
      <Monitor />
    </ProtectedRoute>
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <ProtectedRoute page={'billing'}><Billing /></ProtectedRoute>
  },
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
