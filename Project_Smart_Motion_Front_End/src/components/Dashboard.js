import React, { useState, useEffect } from "react";

import SensorDataService from "../services/SensorService";
import calculateSensorStats from "./Math";
import {downloadCSV} from "./CSV";

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
        //console.log("API response:", response.data);

        const luminosityData = response.data
          .filter((sensor) => sensor.sensorType === "Luminosity")
          .map((sensor) => sensor.sensorValue);

        const temperatureData = response.data
          .filter((sensor) => sensor.sensorType === "Temperature")
          .map((sensor) => sensor.sensorValue);

        //console.log("Luminosity Data:", luminosityData);
        //console.log("Temperature Data:", temperatureData);

        setSensors(response.data);

        const luminosityStats = calculateSensorStats(luminosityData);
        setLuminosityStats(luminosityStats);

        const temperatureStats = calculateSensorStats(temperatureData);
        setTemperatureStats(temperatureStats);

        //console.log("L_data:",luminosityStats);
        //console.log("T_data:",temperatureStats);
      })

      .catch((error) => {
        console.log("API error:", error);
      });
  };

  const handleExportLuminosity = () => {
    downloadCSV([luminosityStats], 'luminosity-data.csv');
  };

  const handleExportTemperature = () => {
    downloadCSV([temperatureStats], 'temperature-data.csv');
  };

  
   return (
    <div className="container">
      <header className="jumbotron">
        <h3>Dashboard</h3>
        <br />
        <br />

        <h4>Luminosity Statistics:</h4>
        <br />
        <p><strong>&nbsp;Maximum:</strong> {luminosityStats.max}</p>
        <p><strong>&nbsp;Minimum:</strong> {luminosityStats.min}</p>
        <p><strong>&nbsp;Mean:</strong> {luminosityStats.mean}</p>
        <p><strong>&nbsp;Standard Deviation:</strong> {luminosityStats.sd}</p>
        <br />
        <br />

        <h4>Temperature Statistics:</h4>
        <br />
        <p><strong>&nbsp;Maximum:</strong> {temperatureStats.max}</p>
        <p><strong>&nbsp;Minimum:</strong> {temperatureStats.min}</p>
        <p><strong>&nbsp;Mean:</strong> {temperatureStats.mean}</p>
        <p><strong>&nbsp;Standard Deviation:</strong> {temperatureStats.sd}</p>
      </header>

      <br />
      <button onClick={handleExportLuminosity}>Export Luminosity to CSV</button>&nbsp;
      <button onClick={handleExportTemperature}>Export Temperature to CSV</button>

    </div>

  );
};

export default Dashboard;