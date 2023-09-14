import React, { useState, useEffect } from "react";

import SensorDataService from "../services/SensorService";
import calculateSensorStats from "./Math";

const Dashboard = () => {

  const [sensors, setSensors] = useState([]);
  //const [sensorData, setSensorData] = useState([]);
  const [statistics, setStatistics] = useState({
    max: NaN,
    min: NaN,
    mean: NaN,
    sd: NaN,
  });

  useEffect(() => {
    retrieveSensors();
  }, []);
  
  const retrieveSensors = () => {
    SensorDataService.getAll()
      .then((response) => {
        //console.log(response.data);
        console.log("API response:", response.data); // Log the entire API response
        const sensorData = response.data.map((sensor) => sensor.sensorValue);
        console.log("sensorData:", sensorData); // Add this line for debugging
        setSensors(response.data);
        const stats = calculateSensorStats(sensorData);
        setStatistics(stats);
        //console.log(statistics.max);
        //console.log(statistics.min);
        //console.log(statistics.mean);
        //console.log(statistics.sd);
      })
      .catch((error) => {
        console.log("API error:", error); // Log any errors
      });
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Dashboard</h3>

        <p><strong>Maximum:</strong> {statistics.max}</p>
        <p><strong>Minimum:</strong> {statistics.min}</p>
        <p><strong>Mean:</strong> {statistics.mean}</p>
        <p><strong>Standard Deviation:</strong> {statistics.sd}</p>
      </header>
    </div>
  );
}; 

export default Dashboard;