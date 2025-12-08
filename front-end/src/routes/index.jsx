import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;