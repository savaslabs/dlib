import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom';
import App from './App';

const rootElement = document.getElementById('app');
render(
  <BrowserRouter basename={'/exhibits/dcrhp'}>
    <App />
  </BrowserRouter>,
  rootElement
);
