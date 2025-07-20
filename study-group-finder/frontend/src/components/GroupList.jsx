import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    api.get('/groups').then(r => setGroups(r.data));
  }, []);

  const joinGroup = id =>
    api.post(`/groups/${id}/join`).then(r =>
      setGroups(gs => gs.map(g => g.id === id ? r.data : g))
    );

  return (
    <div>
      <h2>Study Groups</h2>
      <Link to="/create">Create Group</Link>
      <button onClick={logout}>Logout</button>
      <ul>
        {groups.map(g => (
          <li key={g.id}>
            <h3>{g.title}</h3>
            <p>{g.description}</p>
            <p>Members: {g.members.length}</p>
            <button onClick={() => joinGroup(g.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
