package com.aldebaran.jwt_authentication.controller;

import com.aldebaran.jwt_authentication.dtos.LoginUserDto;
import com.aldebaran.jwt_authentication.dtos.RegisterUserDto;
import com.aldebaran.jwt_authentication.model.UserModel;
import com.aldebaran.jwt_authentication.response.LoginResponse;
import com.aldebaran.jwt_authentication.service.AuthService;
import com.aldebaran.jwt_authentication.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class UserController {
    private final AuthService authService;
    private final JwtService jwtService;

    @Autowired
    public UserController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDto loginUserDto) {
        UserModel authenticateUser = authService.login(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticateUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime(jwtToken));

        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<UserModel> register(@RequestBody RegisterUserDto registerUserDto) {
        return new ResponseEntity<>(authService.register(registerUserDto), HttpStatus.CREATED);
    }
}
