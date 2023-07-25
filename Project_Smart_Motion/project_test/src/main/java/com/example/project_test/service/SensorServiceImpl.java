package com.example.project_test.service;

import com.example.project_test.exception.ResourceNotFoundException;
import com.example.project_test.model.Sensor;
import com.example.project_test.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SensorServiceImpl implements SensorService {
    private final SensorRepository sensorRepository;

    @Autowired
    public SensorServiceImpl(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    @Override
    public Sensor createSensor(Sensor sensor) {
        sensor.setUID(sensor.getUID());
        return sensorRepository.save(sensor);
    }

    @Override
    public Sensor getSensor(String UID) {
        Optional < Sensor > sensorS = this.sensorRepository.findById(UID);

        if (sensorS.isPresent()) {
            return sensorS.get();
        } else {
            throw new ResourceNotFoundException("Sensor not found with UID : " + UID);
        }
        }

    @Override
    public Sensor updateSensor(Sensor sensor) {
        Optional< Sensor > sensorS = this.sensorRepository.findById(sensor.getUID());

        if (sensorS.isPresent()) {
            Sensor sensorUpdate = sensorS.get();
            sensorUpdate.setUID(sensor.getUID());
            sensorUpdate.setSensorValue(sensor.getSensorValue());
            sensorUpdate.setTimestamp(sensor.getTimestamp());
            sensorRepository.save(sensorUpdate);
            return sensorUpdate;
        } else {
            throw new ResourceNotFoundException("Record not found with UID : " + sensor.getUID());
        }
}

    @Override
    public void deleteSensor(String UID) {
        sensorRepository.deleteById(UID);
    }


    public void deleteAllSensors() {
        sensorRepository.deleteAll();
    }

    @Override
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }
}
