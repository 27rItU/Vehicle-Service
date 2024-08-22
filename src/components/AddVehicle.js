import React, { useState } from 'react';
import axios from 'axios';


function AddVehicle() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vehicle = { make, model, year };
    await axios.post('http://localhost:8000/api/vehicles/', vehicle);
    setMake('');
    setModel('');
    setYear('');
  };

  return (
    <div>
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Make:</label>
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
        </div>
        <div>
          <label>Model:</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div>
          <label>Year:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

export default AddVehicle;
