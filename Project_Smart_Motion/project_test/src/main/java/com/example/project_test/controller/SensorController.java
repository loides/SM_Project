package com.example.project_test.controller;

import com.example.project_test.model.Sensor;
import com.example.project_test.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class SensorController {
    private final SensorService sensorService;

    @Autowired
    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @PostMapping("/sensors")
    public ResponseEntity <Sensor> createSensor(@RequestBody Sensor sensor) {
        return ResponseEntity.ok().body(sensorService.createSensor(sensor));
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @GetMapping("/sensors/{UID}")
    public ResponseEntity <Sensor> getSensor(@PathVariable String UID) {
        return ResponseEntity.ok().body(sensorService.getSensor(UID));
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @PutMapping("/sensors/{UID}")
    public ResponseEntity <Sensor> updateSensor(@PathVariable String UID, @RequestBody Sensor sensor) {
        sensor.setUID(UID);
        return ResponseEntity.ok().body(sensorService.updateSensor(sensor));
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @DeleteMapping("/sensors/{UID}")
    public HttpStatus deleteSensor(@PathVariable String UID) {
        sensorService.deleteSensor(UID);
        return HttpStatus.OK;
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @DeleteMapping("/sensors")
    public HttpStatus deleteAllSensors() {
        sensorService.deleteAllSensors();
        return HttpStatus.OK;
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @GetMapping("/sensors")
    public ResponseEntity < List<Sensor>> getAllSensors() {
        return ResponseEntity.ok().body(sensorService.getAllSensors());
    }
}
