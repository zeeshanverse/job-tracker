package com.zeeshan.jobtrack.service;
import com.zeeshan.jobtrack.dto.AuthDtos.*; import com.zeeshan.jobtrack.entity.AppUser; import com.zeeshan.jobtrack.repository.UserRepository; import com.zeeshan.jobtrack.security.JwtService; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.stereotype.Service; import java.time.Instant;
@Service public class AuthService { private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
 public AuthService(UserRepository u,PasswordEncoder e,JwtService j){users=u;encoder=e;jwt=j;}
 public AuthResponse register(RegisterRequest r){if(users.existsByEmailIgnoreCase(r.email()))throw new IllegalArgumentException("Email is already registered"); AppUser u=new AppUser();u.setName(r.name().trim());u.setEmail(r.email().trim().toLowerCase());u.setPasswordHash(encoder.encode(r.password()));u.setCreatedAt(Instant.now());users.save(u);return response(u);}
 public AuthResponse login(LoginRequest r){AppUser u=users.findByEmailIgnoreCase(r.email()).orElseThrow(()->new IllegalArgumentException("Invalid email or password"));if(!encoder.matches(r.password(),u.getPasswordHash()))throw new IllegalArgumentException("Invalid email or password");return response(u);}
 private AuthResponse response(AppUser u){return new AuthResponse(jwt.generate(u.getId(),u.getEmail()),new UserResponse(u.getId().toString(),u.getName(),u.getEmail()));}
}
