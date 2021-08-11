import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'normalize.css';
import reportWebVitals from './reportWebVitals';
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    * {
    box-sizing: border-box;
    }
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    font-weight: 400;
  }
`;


ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
