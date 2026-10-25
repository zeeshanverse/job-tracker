package com.zeeshan.jobtrack.repository;
import com.zeeshan.jobtrack.entity.AppUser; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface UserRepository extends JpaRepository<AppUser,UUID>{ Optional<AppUser> findByEmailIgnoreCase(String email); boolean existsByEmailIgnoreCase(String email); }
