import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Media from './Media';

const MediaRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();
  if (!isAuthenticated) navigate('/login');
  return (<Routes>
    <Route path="/" element={<Media />}/>
  </Routes>)
};

export default MediaRoutes;
