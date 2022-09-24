
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
// require('dotenv').config()

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
