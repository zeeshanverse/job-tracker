package com.zeeshan.jobtrack.repository;
import com.zeeshan.jobtrack.entity.*; import org.springframework.data.domain.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface JobApplicationRepository extends JpaRepository<JobApplication,UUID>{ Page<JobApplication> findByUserId(UUID userId, Pageable pageable); Optional<JobApplication> findByIdAndUserId(UUID id,UUID userId); long countByUserId(UUID userId); long countByUserIdAndStatus(UUID userId,JobStatus status); }
