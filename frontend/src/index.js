import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Reducers from "./reducers";

const store = legacy_createStore(Reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider
        clientId={`961569576761-9tkrpof633scmq77pr3acnbflc1g227i.apps.googleusercontent.com`}
        // clientSecret={`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`}
      >
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
);
