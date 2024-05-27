import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
// import { ThemeModeProvider } from './contexts/theme-context';
import reportWebVitals from './reportWebVitals';
import { get } from './services/server/base-service';
import LoadIndicator from './components/general/load-indicator';
// import './i18n';
import './index.css';

const container = document.getElementById('root');
let routingApp = null;
get('api/healthcheck')
  .then(() => {
    routingApp = (
      <App></App>
    );
  })
  .catch((error) => {
    routingApp = (
      <App error={error} ></App>
    );
  })
  .finally(() => {
    const routing = (
      <React.StrictMode>
        <BrowserRouter>
          {routingApp}
        </BrowserRouter>
      </React.StrictMode>
    );
    const root = createRoot(container);
    root.render(routing);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
