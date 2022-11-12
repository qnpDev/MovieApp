package com.qnp.server;

import com.fasterxml.uuid.Generators;
import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    UsersRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Khi chương trình chạy
        // Insert vào csdl một user.
        if(userRepository.count() == 0){
            UsersModel user = new UsersModel();
            user.setUsername("admin");
            user.setName("Administrator");
            user.setEmail("admin@qui.name.vn");
            user.setAvatar("https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg");
            user.setRoles("ROLE_ADMIN");
            user.setRefreshToken(Generators.randomBasedGenerator().generate().toString());
            user.setPassword(passwordEncoder.encode("123456"));
            userRepository.save(user);
            System.out.println(user);
        }
    }
}
