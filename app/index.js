import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { hydrate, render } from 'react-dom';
import App from './App';

const rootElement = document.getElementById('app');
if (rootElement.hasChildNodes()) {
  hydrate(
    <BrowserRouter basename={'/exhibits/dcrhp'}>
      <App />
    </BrowserRouter>,
    rootElement
  );
} else {
  render(
    <BrowserRouter basename={'/exhibits/dcrhp'}>
      <App />
    </BrowserRouter>,
    rootElement
  );
}
