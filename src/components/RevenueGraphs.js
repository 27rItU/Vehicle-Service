import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function RevenueGraphs() {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await axios.get('http://localhost:8000/api/transactions/');
        const transactions = transactionResponse.data;

        const daily = {};
        const monthly = {};
        const yearly = {};

        transactions.forEach((transaction) => {
          const date = new Date(transaction.date);
          const day = date.toISOString().split('T')[0];
          const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
          const year = date.getFullYear();

          // Aggregate daily revenue
          if (!daily[day]) daily[day] = 0;
          daily[day] += parseFloat(transaction.final_price);

          // Aggregate monthly revenue
          if (!monthly[month]) monthly[month] = 0;
          monthly[month] += parseFloat(transaction.final_price);

          // Aggregate yearly revenue
          if (!yearly[year]) yearly[year] = 0;
          yearly[year] += parseFloat(transaction.final_price);
        });

        // Convert objects to arrays suitable for recharts
        setDailyData(Object.keys(daily).map((key) => ({ date: key, revenue: daily[key] })));
        setMonthlyData(Object.keys(monthly).map((key) => ({ date: key, revenue: monthly[key] })));
        setYearlyData(Object.keys(yearly).map((key) => ({ date: key, revenue: yearly[key] })));
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Revenue Graphs</h2>
      
      <h3>Daily Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      
      <h3>Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Yearly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueGraphs;
