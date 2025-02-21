import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

console.log('React app starting...');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('React app mounted');
