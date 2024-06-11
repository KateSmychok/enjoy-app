import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/home-page';
import ProfilePage from './pages/profile/profile-page';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};
