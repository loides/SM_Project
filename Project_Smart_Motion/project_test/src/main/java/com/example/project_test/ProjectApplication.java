package com.example.project_test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication //(scanBasePackages = {"com/example/project_test/service", "com/example/project_test/security", "com/example/project_test/model", "com/example/project_test/controller"})
@EnableMongoRepositories //(basePackages = "com/example/project_test/repository")

public class ProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}

}
