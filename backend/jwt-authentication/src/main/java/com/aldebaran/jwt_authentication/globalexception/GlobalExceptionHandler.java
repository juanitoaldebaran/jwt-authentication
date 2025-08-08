package com.aldebaran.jwt_authentication.globalexception;

import com.aldebaran.jwt_authentication.exception.EmailAlreadyUsedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<String> handleEmailAlreadyExist(EmailAlreadyUsedException e) {
        return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }
}
