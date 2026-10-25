package com.zeeshan.jobtrack.controller;
import com.zeeshan.jobtrack.dto.AuthDtos.*; import com.zeeshan.jobtrack.service.AuthService; import jakarta.validation.Valid; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth") public class AuthController {private final AuthService s;public AuthController(AuthService s){this.s=s;} @PostMapping("/register") public AuthResponse register(@Valid @RequestBody RegisterRequest r){return s.register(r);} @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest r){return s.login(r);}}
