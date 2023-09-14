import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import SensorDataService from "../services/SensorService";

const Sensor = props => {
  const {uid }= useParams();
  let navigate = useNavigate();

  const initialSensorState = {
    uid: null,
    sensorValue: null,
    timestamp: "",
    sensorType: ""
  };
  const [currentSensor, setCurrentSensor] = useState(initialSensorState);
  const [message, setMessage] = useState("");

  const getSensor = uid => {
    SensorDataService.get(uid)
      .then(response => {
        setCurrentSensor(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (uid)
      getSensor(uid);
  }, [uid]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentSensor({ ...currentSensor, [name]: value });
  };

  const updateSensor = () => {
    SensorDataService.update(currentSensor.uid, currentSensor)
      .then(response => {
        console.log(response.data);
        setMessage("The sensor was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteSensor = () => {
    SensorDataService.delete(currentSensor.uid)
      .then(response => {
        console.log(response.data);
        navigate("/sensors");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
    {currentSensor ? (
      <div className="edit-form">
        <h4>Sensor</h4>
        <form>
  <div className="form-group">
    <label htmlFor="uid">UID</label>
    <input
      type="text"
      className="form-control"
      id="uid"
      name="uid"
      value={currentSensor.uid}
      onChange={handleInputChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="sensorValue">Sensor Value</label>
    <input
      type="number"
      className="form-control"
      id="sensorValue"
      name="sensorValue"
      value={currentSensor.sensorValue}
      onChange={handleInputChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="timestamp">Timestamp</label>
    <input
      type="text"
      className="form-control"
      id="timestamp"
      name="timestamp"
      value={currentSensor.timestamp}
      onChange={handleInputChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="sensorType">Sensor Type</label>
    <input
      type="text"
      className="form-control"
      id="sensorType"
      name="sensorType"
      value={currentSensor.sensorType}
      onChange={handleInputChange}
    />
  </div>
</form>


        <button className="badge badge-danger mr-2" onClick={deleteSensor}>
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={updateSensor}
        >
          Update
        </button>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Sensor...</p>
      </div>
    )}
  </div>
  
  );
};

export default Sensor;