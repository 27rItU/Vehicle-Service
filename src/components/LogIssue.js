// src/components/LogIssue.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LogIssue() {
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [issueType, setIssueType] = useState('new');

  useEffect(() => {
    const fetchData = async () => {
      const vehicleResponse = await axios.get('http://localhost:8000/api/vehicles/');
      const componentResponse = await axios.get('http://localhost:8000/api/components/');
      setVehicles(vehicleResponse.data);
      setComponents(componentResponse.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const issue = {
      vehicle: selectedVehicle,
      component: selectedComponent,
      issue_type: issueType,
    };
    await axios.post('http://localhost:8000/api/issues/', issue);
  };

  return (
    <div>
      <h2>Log Issue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle:</label>
          <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Component:</label>
          <select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)}>
            {components.map((component) => (
              <option key={component.id} value={component.id}>
                {component.name} ({component.component_type})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Issue Type:</label>
          <select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
            <option value="new">New</option>
            <option value="repair">Repair</option>
          </select>
        </div>
        <button type="submit">Log Issue</button>
      </form>
    </div>
  );
}

export default LogIssue;
