import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handle = async e => {
    e.preventDefault();
    await api.post('/users/register', { username, email, password });
    nav('/login');
  };

  return (
    <form onSubmit={handle}>
      <h2>Register</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" type="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}
