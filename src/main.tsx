import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./index.css";
import UserReducer from "./UserReducer.js";

import "./i18n";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    users: UserReducer
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
