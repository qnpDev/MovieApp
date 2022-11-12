package com.qnp.server;

import com.fasterxml.uuid.Generators;
import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Autowired
    UsersRepo userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Value("${user.default.avatar}")
    private String defaultAvatar;
    @Value("${admin.username}")
    private String adminUsername;
    @Value("${admin.password}")
    private String adminPassword;
    @Value("${admin.name}")
    private String adminName;
    @Value("${admin.email}")
    private String adminEmail;

    @Override
    public void run(String... args) throws Exception {
        // Khi chương trình chạy
        // Insert vào csdl một user.
        if(userRepository.count() == 0){
            UsersModel user = new UsersModel();
            user.setUsername(adminUsername);
            user.setName(adminName);
            user.setEmail(adminEmail);
            user.setAvatar(defaultAvatar);
            user.setRoles("ROLE_USER,ROLE_ADMIN");
            user.setPassword(passwordEncoder.encode(adminPassword));
            userRepository.save(user);
            System.out.println(user);
        }
    }
}
