package com.aldebaran.jwt_authentication.service;

import com.aldebaran.jwt_authentication.dtos.LoginUserDto;
import com.aldebaran.jwt_authentication.dtos.RegisterUserDto;
import com.aldebaran.jwt_authentication.model.MemberType;
import com.aldebaran.jwt_authentication.model.UserModel;
import com.aldebaran.jwt_authentication.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager, UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public UserModel register(RegisterUserDto registerUserDto) {
        if (userRepo.existsByEmail(registerUserDto.getEmail())) {
            throw new IllegalStateException("Email has been used");
        }

        UserModel userModel = new UserModel()
                .setFirstName(registerUserDto.getFirstName())
                .setLastName(registerUserDto.getLastName())
                .setEmail(registerUserDto.getEmail())
                .setPassword(passwordEncoder.encode(registerUserDto.getPassword()))
                .setMemberType(registerUserDto.getMemberType() != null ? registerUserDto.getMemberType() : MemberType.REGULAR);

        return userRepo.save(userModel);
    }

    public UserModel login(LoginUserDto loginUser) {
       authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
               loginUser.getEmail(),
               loginUser.getPassword()
       ));

       return userRepo.findUserByEmail(loginUser.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
