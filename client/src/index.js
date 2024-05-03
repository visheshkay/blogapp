import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from "./contexts/Store";
import ArticlesStore from './contexts/ArticlesStore'
import reportWebVitals from './reportWebVitals';
import {store} from './redux/store'
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Store>
      <ArticlesStore>
        <Provider store={store}>
        <App />
        </Provider>
    </ArticlesStore>
    </Store>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
