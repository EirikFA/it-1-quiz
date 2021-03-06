import "@fortawesome/fontawesome-free/css/all.css";
import "./bulma.scss";

import { supabase, SupabaseContext } from "@api";
import { App } from "@components/App";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <StrictMode>
    <SupabaseContext.Provider value={supabase}>
      <App />
    </SupabaseContext.Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
