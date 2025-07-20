import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function CreateGroup() {
  const [title, setTitle]         = useState('');
  const [description, setDesc]    = useState('');
  const nav = useNavigate();

  const handle = async e => {
    e.preventDefault();
    await api.post('/groups', { title, description });
    nav('/');
  };

  return (
    <form onSubmit={handle}>
      <h2>Create Study Group</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDesc(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
