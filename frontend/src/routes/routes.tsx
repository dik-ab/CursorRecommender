// src/routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import UploadVideo from '../pages/UploadVideo';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload-video" element={<UploadVideo />} />
    </Routes>
  );
}

export default AppRoutes;
