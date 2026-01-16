import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Console from './pages/dashboard/components/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
      {/* <Routes>
        <Route path="/dashboard" Component={Console}>
        </Route>
      </Routes> */}
    </Router>
  </React.StrictMode>,
)
