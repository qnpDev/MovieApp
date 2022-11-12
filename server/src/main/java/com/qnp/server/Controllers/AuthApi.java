package com.qnp.server.Controllers;

import com.fasterxml.uuid.Generators;
import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.UsersRepo;
import com.qnp.server.Utils.Payloads.Auth.*;
import com.qnp.server.Utils.CustomUserDetails;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import com.qnp.server.Utils.jwt.JwtToken;
import com.qnp.server.Utils.jwt.JwtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthApi {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private JwtUserService jwtUserService;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@Valid @RequestBody SigninRequest loginRequest){
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtToken.generateToken((CustomUserDetails) authentication.getPrincipal());
            Optional<UsersModel> user = usersRepo.findById(((CustomUserDetails) authentication.getPrincipal()).getId());
            return ResponseEntity.ok(new SigninResponse(true, "success", jwt, user.get()));
        }catch (IllegalArgumentException ex){
            return ResponseEntity.ok(new SigninResponse(false, "Exception", null, null));
        }
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest){
        try{
            UsersModel user = usersRepo.findByRefreshToken(refreshTokenRequest.getRefreshToken());
            if(user != null){
                String jwt = jwtToken.generateToken((CustomUserDetails) jwtUserService.loadUserByUsername(user.getUsername()));
                return ResponseEntity.ok(new RefreshTokenResponse(true, "success", jwt));
            }else{
                return ResponseEntity.ok(new RefreshTokenResponse(false, "Not found refreshToken", null));
            }
        }catch (IllegalArgumentException ex){
            return ResponseEntity.ok(new RefreshTokenResponse(true, "Something wrongs", null));
        }
    }

    @PostMapping("/changepassword")
    @PreAuthorize("!isAnonymous()")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePassRequest changePassRequest){
        try{
            UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
            if(passwordEncoder.matches(changePassRequest.getOldPassword(), user.getPassword())){
                user.setPassword(passwordEncoder.encode(changePassRequest.getNewPassword()));
                usersRepo.save(user);
                return ResponseEntity.ok(new GeneralResponse(true, "success", null));
            }else{
                return ResponseEntity.ok(new GeneralResponse(false, "Old Password incorrect", null));
            }
        }catch (IllegalArgumentException ex){
            return ResponseEntity.ok(new GeneralResponse(false, "Something wrongs", null));
        }
    }

    @Value("${user.default.avatar}")
    private String defaultAvatar;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest loginRequest){
        try{
            if (loginRequest.getUsername() == null || loginRequest.getPassword() == null || loginRequest.getName() == null || loginRequest.getEmail() == null) {
                return ResponseEntity.ok(new SignupResponse(false, "Not enough infomation", null, null));
            }
            if(usersRepo.findByUsername(loginRequest.getUsername()) == null){
                //signup
                UsersModel user = new UsersModel();
                user.setUsername(loginRequest.getUsername());
                user.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
                user.setEmail(loginRequest.getEmail());
                user.setName(loginRequest.getName());
                user.setAvatar(defaultAvatar);
                UsersModel userSave = usersRepo.save(user);

                //signin
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(),
                                loginRequest.getPassword()
                        )
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtToken.generateToken((CustomUserDetails) authentication.getPrincipal());
                return ResponseEntity.ok(new SignupResponse(true, "success", jwt, userSave));
            }else{
                return ResponseEntity.ok(new SignupResponse(false, "Username already exists", null, null));
            }
        }catch (IllegalArgumentException ex){
            return ResponseEntity.ok(new SignupResponse(false, "Something wrongs", null, null));
        }
    }

}
