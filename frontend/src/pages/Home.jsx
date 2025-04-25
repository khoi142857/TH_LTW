// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';

function Home() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  // 4.1 Fetch data
  useEffect(() => {
    fetch('http://localhost:3001/api/items')
      .then(res => res.json())
      .then(json => setItems(json.data));
  }, []);

  // 4.2 Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(json => {
        setItems(prev => [...prev, json.data]);
        setForm({ name: '', description: '' });
      });
  };

  return (
    <div className="home">
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}: {item.description}</li>
        ))}
      </ul>

      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Home;