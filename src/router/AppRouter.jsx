import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../page/dashboard/Dashboard';
import Login from '../page/authentification/Logins';
import Register from '../page/authentification/Register';
import Panier from '../page/panier/Panier';

function AppRouter() {
  return (
    <Routes>

        <Route path="/panier" element={<Panier />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRouter;
