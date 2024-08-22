// src/components/RegisterComponent.js
import React, { useState } from 'react';
import axios from 'axios';

function RegisterComponent() {
  const [name, setName] = useState('');
  const [type, setType] = useState('new');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const component = { name, component_type: type, price };
    await axios.post('http://localhost:8000/api/components/', component);
    setName('');
    setType('new');
    setPrice('');
  };

  return (
    <div>
      <h2>Register Component</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="new">New</option>
            <option value="repair">Repair</option>
          </select>
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterComponent;
