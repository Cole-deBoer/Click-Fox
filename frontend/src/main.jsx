import React, { StrictMode } from 'react';
import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter forceRefresh>
      <App />
    </BrowserRouter>
  </StrictMode>
);