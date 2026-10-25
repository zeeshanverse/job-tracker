package com.zeeshan.jobtrack.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity @Table(name="users")
public class AppUser {
  @Id @GeneratedValue(strategy=GenerationType.UUID) private UUID id;
  @Column(nullable=false, unique=true, length=190) private String email;
  @Column(nullable=false, length=100) private String name;
  @Column(name="password_hash", nullable=false) private String passwordHash;
  @Column(nullable=false) private Instant createdAt;
  public UUID getId(){return id;} public String getEmail(){return email;} public String getName(){return name;} public String getPasswordHash(){return passwordHash;} public Instant getCreatedAt(){return createdAt;}
  public void setEmail(String v){email=v;} public void setName(String v){name=v;} public void setPasswordHash(String v){passwordHash=v;} public void setCreatedAt(Instant v){createdAt=v;}
}
