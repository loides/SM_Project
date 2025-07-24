package com.example.project_test;

import com.example.project_test.model.ERole;
import com.example.project_test.model.Role;
import com.example.project_test.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DBInitializer implements CommandLineRunner {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        initializeRoles();
    }

    private void initializeRoles() {
        // Check and create ROLE_USER if it doesn't exist
        if (!roleRepository.findByName(ERole.ROLE_USER).isPresent()) {
            Role userRole = new Role(ERole.ROLE_USER);
            roleRepository.save(userRole);
            System.out.println("Created ROLE_USER");
        }

        // Check and create ROLE_MODERATOR if it doesn't exist
        if (!roleRepository.findByName(ERole.ROLE_MODERATOR).isPresent()) {
            Role modRole = new Role(ERole.ROLE_MODERATOR);
            roleRepository.save(modRole);
            System.out.println("Created ROLE_MODERATOR");
        }

        // Check and create ROLE_ADMIN if it doesn't exist
        if (!roleRepository.findByName(ERole.ROLE_ADMIN).isPresent()) {
            Role adminRole = new Role(ERole.ROLE_ADMIN);
            roleRepository.save(adminRole);
            System.out.println("Created ROLE_ADMIN");
        }

        System.out.println("Database initialization completed");
    }
}
