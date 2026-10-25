package com.zeeshan.jobtrack.dto;
import com.zeeshan.jobtrack.entity.*; import jakarta.validation.constraints.*; import java.time.*; import java.util.*;
public final class JobDtos {
 public record JobRequest(@NotBlank @Size(max=160) String company,@NotBlank @Size(max=180) String position,@Size(max=180) String location,WorkMode workMode,JobStatus status,JobPriority priority,@Size(max=80) String source,@Size(max=1000) String jobUrl,@Size(max=120) String salary,@Size(max=120) String recruiterName,@Email @Size(max=190) String recruiterEmail,LocalDate appliedDate,LocalDate deadline,LocalDate nextFollowUpDate,@Size(max=5000) String notes){}
 public record JobResponse(UUID id,String company,String position,String location,WorkMode workMode,JobStatus status,JobPriority priority,String source,String jobUrl,String salary,String recruiterName,String recruiterEmail,LocalDate appliedDate,LocalDate deadline,LocalDate nextFollowUpDate,String notes,Instant createdAt,Instant updatedAt){}
 public record PageResponse<T>(List<T> content,int page,int size,long totalElements,int totalPages){ }
 public record DashboardResponse(long total,long saved,long applied,long screening,long interviews,long offers,long rejected,long active){}
}
