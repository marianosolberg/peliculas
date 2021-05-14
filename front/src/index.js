import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";
import { BrowserRouter } from "react-router-dom";
import "bootswatch/dist/darkly/bootstrap.min.css";
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div className="bg-prymary">
        <App />
      </div>
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
