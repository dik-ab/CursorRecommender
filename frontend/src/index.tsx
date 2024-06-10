import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// `root`がnullでないことをTypeScriptに伝えるための非nullアサーション
const rootElement = document.getElementById('root')!;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
