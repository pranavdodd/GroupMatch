import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const handle = async e => {
    e.preventDefault();
    const res = await api.post(
      '/users/login',
      `username=${username}&password=${password}`,
      { headers: {'Content-Type':'application/x-www-form-urlencoded'} }
    );
    login(res.data.access_token);
    nav('/');
  };

  return (
    <form onSubmit={handle}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
