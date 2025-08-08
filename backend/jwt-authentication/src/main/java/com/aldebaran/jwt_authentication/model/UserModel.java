package com.aldebaran.jwt_authentication.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table (name = "user_table")
public class UserModel implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column (name = "first_name", nullable = false)
    private String firstName;

    @Column (name = "last_name", nullable = false)
    private String lastName;

    @Column (name = "email", nullable = false)
    private String email;

    @Column (name = "password", nullable = false)
    private String password;

    @Enumerated (EnumType.STRING)
    private MemberType memberType;

    @CreationTimestamp
    @Column (name = "issued_at")
    private Date issuedAt;

    @UpdateTimestamp
    @Column (name = "updated_at")
    private Date updatedAt;

    public UserModel(Integer id, String firstName, String lastName, String email, String password, MemberType memberType, Date issuedAt, Date updatedAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.memberType = memberType;
        this.issuedAt = issuedAt;
        this.updatedAt = updatedAt;
    }

    public UserModel() {
    }

    public Integer getId() {
        return id;
    }

    public UserModel setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public UserModel setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public UserModel setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserModel setEmail(String email) {
        this.email = email;
        return this;
    }

    public UserModel setPassword(String password) {
        this.password = password;
        return this;
    }

    public MemberType getMemberType() {
        return memberType;
    }

    public UserModel setMemberType(MemberType memberType) {
        this.memberType = memberType;
        return this;
    }

    public Date getIssuedAt() {
        return issuedAt;
    }

    public UserModel setIssuedAt(Date issuedAt) {
        this.issuedAt = issuedAt;
        return this;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public UserModel setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(memberType.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
