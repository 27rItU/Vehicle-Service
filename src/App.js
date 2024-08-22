import React from 'react';
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import RegisterComponent from './components/RegisterComponent';
import AddVehicle from './components/AddVehicle';
import LogIssue from './components/LogIssue';
import CalculatePrice from './components/CalculatePrice';
import RevenueGraphs from './components/RevenueGraphs';

const appRouter = createBrowserRouter([
  {
    path: "/",
   // element: <Body />,
    children: [
      {
        path: "/",
        element: <RegisterComponent />,
      },
      {
        path: "/add-vehicle",
        element: <AddVehicle />,
      }
      ,
      {
        path: "/log-issue",
        element: <LogIssue  />,
      }
      ,
      {
        path: "/calculate-price",
        element: <CalculatePrice />,
      },
      {
        path: "/revenue-graphs",
        element: <RevenueGraphs />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      {}
      <RouterProvider router={appRouter} />

      
    
    
    {}
    </div>
    
  );
}

export default App;
