import React from 'react';
import ReactDOM from 'react-dom';
// import { ThemeProvider } from 'styled-components';
// import { BrowserRouter } from 'react-router-dom';
// import { baseTheme } from './theme/theme';
// import { GlobalStyle } from './theme/GlobalStyle';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app = <App />
const root = document.getElementById('root');

ReactDOM.render(app, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
