import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { hydrate, render } from 'react-dom';
import App from './App';

const rootElement = document.getElementById('app');
if (rootElement.hasChildNodes()) {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootElement
  );
} else {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootElement
  );
}
