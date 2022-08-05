import React from "react";
import ReactDOM from "react-dom/client";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "normalize.css";
import "./index.scss";

import { App } from "./components/App/";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

if ("serviceWorker" in navigator) {
  serviceWorkerRegistration.register();
}
