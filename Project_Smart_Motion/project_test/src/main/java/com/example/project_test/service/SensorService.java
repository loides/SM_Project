package com.example.project_test.service;

import com.example.project_test.model.Sensor;

import java.util.List;

public interface SensorService {
    Sensor createSensor(Sensor sensor);
    Sensor getSensor(String UID);
    Sensor updateSensor(Sensor sensor);
    void deleteSensor(String UID);
    void deleteAllSensors();

    List<Sensor> getAllSensors();
}