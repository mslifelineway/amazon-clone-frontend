import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import { DrawerContextProvider } from "./contexts";

ReactDOM.render(
  <DrawerContextProvider>
    <App />
  </DrawerContextProvider>,
  document.getElementById("root")
);
