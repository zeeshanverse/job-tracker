package com.zeeshan.jobtrack.dto;
import jakarta.validation.constraints.*;
public final class AuthDtos {
 public record RegisterRequest(@NotBlank @Size(min=2,max=100) String name,@NotBlank @Email String email,@NotBlank @Size(min=8,max=100) String password){}
 public record LoginRequest(@NotBlank @Email String email,@NotBlank String password){}
 public record AuthResponse(String token, UserResponse user){}
 public record UserResponse(String id,String name,String email){}
}
