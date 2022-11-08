import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import PanelState from './context/panelentry/PanelState'
import BroadcastingState from './context/broadcasting/BroadcastingState'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BroadcastingState>
    <PanelState >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PanelState>
  </BroadcastingState>
);

