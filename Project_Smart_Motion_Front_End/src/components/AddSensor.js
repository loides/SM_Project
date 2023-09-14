import React, { useState } from "react";
import SensorDataService from "../services/SensorService";

const AddSensor = () => {
  const initialSensorState = {
    uid: "",
    sensorValue: "",
    timestamp: "",
    sensorType: ""
  };
  const [sensor, setSensor] = useState(initialSensorState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSensor({ ...sensor, [name]: value });
  };

  const saveSensor = () => {
    SensorDataService.create(sensor)
      .then((response) => {
        setSensor({
          uid: response.data.uid,
          sensorValue: response.data.sensorValue,
          timestamp: response.data.timestamp,
          sensorType: response.data.sensorType 
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const newSensor = () => {
    setSensor(initialSensorState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSensor}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="uid">UID</label>
            <input
              type="text"
              className="form-control"
              id="uid"
              required
              value={sensor.uid}
              onChange={handleInputChange}
              name="uid"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sensorValue">Sensor Value</label>
            <input
              type="number"
              className="form-control"
              id="sensorValue"
              required
              value={sensor.sensorValue}
              onChange={handleInputChange}
              name="sensorValue"
            />
          </div>

          <div className="form-group">
            <label htmlFor="timestamp">Timestamp</label>
            <input
              type="text"
              className="form-control"
              id="timestamp"
              required
              value={sensor.timestamp}
              onChange={handleInputChange}
              name="timestamp"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sensorType">Sensor Type</label>
            <input
              type="text"
              className="form-control"
              id="sensorType"
              required
              value={sensor.sensorType}
              onChange={handleInputChange}
              name="sensorType"
            />
          </div>

          <button onClick={saveSensor} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSensor;
