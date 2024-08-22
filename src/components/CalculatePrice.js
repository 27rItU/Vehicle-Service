import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CalculatePrice() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const vehicleResponse = await axios.get('http://localhost:8000/api/vehicles/');
      setVehicles(vehicleResponse.data);
    };
    fetchData();
  }, []);

  const handleCalculate = async () => {
    const response = await axios.get(`http://localhost:8000/api/issues/?vehicle=${selectedVehicle}`);
    const issues = response.data;
    let price = 0;
    issues.forEach((issue) => {
      price += parseFloat(issue.component.price);
    });
    setTotalPrice(price);
  };

  const handlePayment = async () => {
    const transaction = {
      vehicle: selectedVehicle,
      final_price: totalPrice,
    };
    await axios.post('http://localhost:8000/api/transactions/', transaction);
  };

  return (
    <div>
      <h2>Calculate and Pay Price</h2>
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
      <button onClick={handleCalculate}>Calculate Price</button>
      <div>Total Price: ${totalPrice}</div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default CalculatePrice;
