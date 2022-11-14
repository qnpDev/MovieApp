package com.qnp.server.Controllers;

import com.fasterxml.uuid.Generators;
import com.qnp.server.Models.ResetPasswordModel;
import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.ResetPasswordRepo;
import com.qnp.server.Repositories.UsersRepo;
import com.qnp.server.Utils.Payloads.Auth.*;
import com.qnp.server.Utils.CustomUserDetails;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import com.qnp.server.Utils.jwt.JwtRefreshToken;
import com.qnp.server.Utils.jwt.JwtToken;
import com.qnp.server.Utils.jwt.JwtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Date;
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
    private ResetPasswordRepo resetPasswordRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    public JavaMailSender mailer;

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
            UsersModel user = usersRepo.findById(((CustomUserDetails) authentication.getPrincipal()).getId()).get();
            user.setPassword(null);
            return ResponseEntity.ok(new SigninResponse(jwt, user.getRefreshToken(), user));
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest){
        try{
            UsersModel user = usersRepo.findByRefreshToken(refreshTokenRequest.getRefreshToken());
            if(user != null){
                String jwt = jwtToken.generateToken((CustomUserDetails) jwtUserService.loadUserByUsername(user.getUsername()));
                return ResponseEntity.ok(new RefreshTokenResponse(true, "success", jwt));
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found Token", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @PostMapping("/change-password")
    @PreAuthorize("!isAnonymous()")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePassRequest changePassRequest){
        try{
            UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
            if(passwordEncoder.matches(changePassRequest.getOldPassword(), user.getPassword())){
                user.setPassword(passwordEncoder.encode(changePassRequest.getNewPassword()));
                user.setRefreshToken((new JwtRefreshToken()).generate());
                usersRepo.save(user);
                return ResponseEntity.ok(new GeneralResponse(true, "success", null));
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, "Old Password incorrect", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @GetMapping("/get-info")
    @PreAuthorize("!isAnonymous()")
    public ResponseEntity<?> getInfo(){
        try{
            UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
            if(user != null){
                return ResponseEntity.ok(user);
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPassRequest resetPassRequest){
        try{
            UsersModel user = usersRepo.findByUsername(resetPassRequest.getUsername());
            if(user != null){
                if(user.getEmail().equals(resetPassRequest.getEmail())){

                    String resetToken = Generators.randomBasedGenerator().generate().toString();
                    ResetPasswordModel resetPasswordModel = new ResetPasswordModel();
                    resetPasswordModel.setUid(user.getId());
                    resetPasswordModel.setToken(resetToken);
                    resetPasswordRepo.save(resetPasswordModel);

                    MimeMessage message = mailer.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

                    String htmlMsg = "<center><h1>" + resetPassRequest.getPath() + "/" + resetToken + "</h1></center>";

                    message.setContent(htmlMsg, "text/html");
                    helper.setTo(resetPassRequest.getEmail());
                    helper.setSubject("qnp Movie Reset Password");

                    mailer.send(message);

                    return ResponseEntity.ok(new GeneralResponse(true, "success", null));
                }else{
                    return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Incorrect email", null));
                }
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, "Incorrect username", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

    @PostMapping("/reset-verify")
    public ResponseEntity<?> verifyPassword(@Valid @RequestBody ResetPassVerifyRequest request){
        try{
            ResetPasswordModel resetModel = resetPasswordRepo.findByToken(request.getToken());
            if(resetModel!= null){
                if(((new Date()).getTime() - resetModel.getCreatedAt().getTime()) < (10 * 60 * 1000)){
                    Optional<UsersModel> user = usersRepo.findById(resetModel.getId());
                    if(user.isPresent()){
                        UsersModel userSave = user.get();
                        userSave.setPassword(passwordEncoder.encode(request.getPassword()));
                        userSave.setRefreshToken(((new JwtRefreshToken()).generate()));
                        usersRepo.save(userSave);
                        resetPasswordRepo.delete(resetModel);
                        return ResponseEntity.ok(new GeneralResponse(true, "success", null));
                    }else {
                        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not Found User", null));
                    }
                }else{
                    resetPasswordRepo.delete(resetModel);
                    return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, "Token is out of time", null));
                }
            }else{
                return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not Found Token", null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
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
                return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new SignupResponse(false, "Username already exists", null, null));
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, ex.getMessage(), null));
        }
    }

}
