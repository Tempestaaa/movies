import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";
// import firebase from "firebase/compat/app";

// const firebaseConfig = {
//   storageBucket: "gs://mern-movies-97ff6.appspot.com",
// };
// firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
