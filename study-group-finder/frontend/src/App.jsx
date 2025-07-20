import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import GroupList from './components/GroupList';
import CreateGroup from './components/CreateGroup';
import { useAuth } from './components/AuthContext';

export default function App() {
  const { token } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={token ? <GroupList /> : <Navigate to="/login" />} />
        <Route path="/create" element={token ? <CreateGroup /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

