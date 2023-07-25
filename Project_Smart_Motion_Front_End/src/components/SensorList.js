import React, { useState, useEffect } from "react";
import SensorDataService from "../services/SensorService";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const SensorList = () => {
  const [sensors, setSensors] = useState([]);
  const [currentSensor, setCurrentSensor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchUID, setSearchUID] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    retrieveSensors();
  }, []);

  const onChangeSearchUID = e => {
    const searchUID = e.target.value;
    setSearchUID(searchUID);
  };

  const retrieveSensors = () => {
    SensorDataService.getAll()
      .then(response => {
        setSensors(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveSensors();
    setCurrentSensor(null);
    setCurrentIndex(-1);
  };

  const setActiveSensor = (sensor, index) => {
    setCurrentSensor(sensor);
    setCurrentIndex(index);
  };

  const deleteAllSensors = () => {
    SensorDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByUID = () => {
    SensorDataService.get(searchUID)
      .then(response => {
        setSensors([response.data]);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const navigateToSensor = (sensor) => {
    navigate(`/sensors/${sensor.uid}`);
  };
  

  return (
    <div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by UID"
          value={searchUID}
          onChange={onChangeSearchUID}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByUID}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>Sensor List</h4>

      <ul className="list-group">
        {sensors &&
          sensors.map((sensor, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveSensor(sensor, index)}
              onDoubleClick={() => navigateToSensor(sensor)}
              key={index}
            >
              {sensor.uid ? sensor.uid : 'No UID'}
            </li>
          ))}
      </ul>

      <button
        className="m-3 btn btn-sm btn-danger"
        onClick={deleteAllSensors}
      >
        Delete All
      </button>
    </div>
    <div className="col-md-6">
      {currentSensor ? (
        <div>
          <h4>Sensor</h4>
          <div>
            <label>
              <strong>UID:</strong>
            </label>{" "}
            {currentSensor.uid ? currentSensor.uid : 'No UID'}
          </div>
          <div>
            <label>
              <strong>Sensor Value:</strong>
            </label>{" "}
            {currentSensor.sensorValue}
          </div>
          <div>
            <label>
              <strong>Timestamp:</strong>
            </label>{" "}
            {currentSensor.timestamp}
          </div>
          <div>
            <label>
              <strong>Sensor Type:</strong>
            </label>{" "}
            {currentSensor.sensorType}
          </div>

          <Link
            to={"/sensors/" + currentSensor.uid}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Sensor...</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default SensorList;
