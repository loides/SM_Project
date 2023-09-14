import React, { useState, useEffect } from "react";

import SensorDataService from "../services/SensorService";
import calculateSensorStats from "./Math";

const Dashboard = () => {

  const [sensors, setSensors] = useState([]);

  const [luminosityStats, setLuminosityStats] = useState({
    max: NaN,
    min: NaN,
    mean: NaN,
    sd: NaN,
  });

  const [temperatureStats, setTemperatureStats] = useState({
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
        console.log("API response:", response.data); // debugging

        const luminosityData = response.data
          .filter((sensor) => sensor.sensorType === "Luminosity")
          .map((sensor) => sensor.sensorValue);

        const temperatureData = response.data
          .filter((sensor) => sensor.sensorType === "Temperature")
          .map((sensor) => sensor.sensorValue);

        console.log("Luminosity Data:", luminosityData);
        console.log("Temperature Data:", temperatureData);

        setSensors(response.data);

        const luminosityStats = calculateSensorStats(luminosityData);
        setLuminosityStats(luminosityStats);

        const temperatureStats = calculateSensorStats(temperatureData);
        setTemperatureStats(temperatureStats);
      })

      .catch((error) => {
        console.log("API error:", error);
      });
  };

   return (
    <div className="container">
      <header className="jumbotron">
        <h3>Dashboard</h3>

        <h4>Luminosity Statistics:</h4>
        <p><strong>Maximum:</strong> {luminosityStats.max}</p>
        <p><strong>Minimum:</strong> {luminosityStats.min}</p>
        <p><strong>Mean:</strong> {luminosityStats.mean}</p>
        <p><strong>Standard Deviation:</strong> {luminosityStats.sd}</p>

        <h4>Temperature Statistics:</h4>
        <p><strong>Maximum:</strong> {temperatureStats.max}</p>
        <p><strong>Minimum:</strong> {temperatureStats.min}</p>
        <p><strong>Mean:</strong> {temperatureStats.mean}</p>
        <p><strong>Standard Deviation:</strong> {temperatureStats.sd}</p>
      </header>
    </div>
  );
};

export default Dashboard;