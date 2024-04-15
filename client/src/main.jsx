import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux"
import store from "./app/store.js";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Toaster />
      <App />
    </Router>
  </Provider>
)
