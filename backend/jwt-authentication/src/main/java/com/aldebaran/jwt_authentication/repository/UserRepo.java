package com.aldebaran.jwt_authentication.repository;

import com.aldebaran.jwt_authentication.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepo extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findUserByEmail(String email);
    boolean existsByEmail(String email);
}
