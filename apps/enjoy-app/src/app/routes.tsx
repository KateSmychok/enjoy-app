import React from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = React.lazy(() => import('./pages/home-page/home-page'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<div>Page not found</div>} />
    </Routes>
  );
};
