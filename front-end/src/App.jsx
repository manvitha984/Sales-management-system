import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;