package com.qnp.server.Routes;

import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.UsersRepository;
import com.qnp.server.Utils.Payloads.Requests.LoginRequest;
import com.qnp.server.Utils.Payloads.Requests.RefreshTokenRequest;
import com.qnp.server.Utils.Payloads.Responses.RandomResponse;
import com.qnp.server.Utils.CustomUserDetails;
import com.qnp.server.Utils.jwt.JwtToken;
import com.qnp.server.Utils.jwt.JwtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class Api {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private JwtUserService jwtUserService;

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest){
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Trả về jwt cho người dùng.
            String jwt = jwtToken.generateToken((CustomUserDetails) authentication.getPrincipal());
            return ResponseEntity.ok(jwt);
        }catch (IllegalArgumentException ex){
            return ResponseEntity.ok("false");
        }
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest){
        try{
            UsersModel user = usersRepository.findByRefreshToken(refreshTokenRequest.getRefreshToken());
            if(user != null){
                String jwt = jwtToken.generateToken((CustomUserDetails) jwtUserService.loadUserByUsername(user.getUsername()));
                return ResponseEntity.ok(jwt);
            }else{
                return ResponseEntity.ok("false");
            }
        }catch (IllegalArgumentException ex){
            return ResponseEntity.ok("false");
        }
    }

    @GetMapping("/random")
    public ResponseEntity<?> randomStuff(){
        return ResponseEntity.ok(new RandomResponse("ahiahi"));
    }

    @GetMapping("/admin")
    public ResponseEntity<?> admin(){
        return ResponseEntity.ok(new RandomResponse("admin"));
    }

}
