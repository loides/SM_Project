package com.example.project_test.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "sensors")
public class Sensor {

    @Id
    private String UID;

    private Double sensorValue;
    private String timestamp;
    private String sensorType; // "Temperature" or "Luminosity"


    // Empty constructor required by MongoDB
    public Sensor() {

    }

    public Sensor(String UID, Double sensorValue, String timestamp, String sensorType) {
        this.UID = UID;
        this.sensorValue = sensorValue;
        this.timestamp = timestamp;
        this.sensorType = sensorType;
    }


    // Getters and Setters
    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }


    public Double getSensorValue() {
        return sensorValue;
    }

    public void setSensorValue(Double sensorValue) {
        this.sensorValue = sensorValue;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getSensorType() {
        return sensorType;
    }

    public void setSensorType(String sensorType) {
        this.sensorType = sensorType;
    }
}
