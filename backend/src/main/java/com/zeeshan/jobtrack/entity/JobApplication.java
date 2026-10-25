package com.zeeshan.jobtrack.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.UUID;

@Entity @Table(name="job_applications", indexes={@Index(name="idx_job_user_status",columnList="user_id,status"),@Index(name="idx_job_user_applied",columnList="user_id,applied_date")})
public class JobApplication {
  @Id @GeneratedValue(strategy=GenerationType.UUID) private UUID id;
  @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="user_id",nullable=false) private AppUser user;
  @Column(nullable=false,length=160) private String company;
  @Column(nullable=false,length=180) private String position;
  @Column(length=180) private String location;
  @Enumerated(EnumType.STRING) @Column(nullable=false,length=20) private WorkMode workMode=WorkMode.FLEXIBLE;
  @Enumerated(EnumType.STRING) @Column(nullable=false,length=20) private JobStatus status=JobStatus.SAVED;
  @Enumerated(EnumType.STRING) @Column(nullable=false,length=20) private JobPriority priority=JobPriority.MEDIUM;
  @Column(length=80) private String source;
  @Column(length=1000) private String jobUrl;
  @Column(length=120) private String salary;
  @Column(length=120) private String recruiterName;
  @Column(length=190) private String recruiterEmail;
  private LocalDate appliedDate;
  private LocalDate deadline;
  private LocalDate nextFollowUpDate;
  @Column(length=5000) private String notes;
  @Column(nullable=false) private Instant createdAt;
  @Column(nullable=false) private Instant updatedAt;
  @PrePersist void pre(){createdAt=updatedAt=Instant.now();} @PreUpdate void upd(){updatedAt=Instant.now();}
  public UUID getId(){return id;} public AppUser getUser(){return user;} public void setUser(AppUser v){user=v;}
  public String getCompany(){return company;} public void setCompany(String v){company=v;} public String getPosition(){return position;} public void setPosition(String v){position=v;}
  public String getLocation(){return location;} public void setLocation(String v){location=v;} public WorkMode getWorkMode(){return workMode;} public void setWorkMode(WorkMode v){workMode=v;}
  public JobStatus getStatus(){return status;} public void setStatus(JobStatus v){status=v;} public JobPriority getPriority(){return priority;} public void setPriority(JobPriority v){priority=v;}
  public String getSource(){return source;} public void setSource(String v){source=v;} public String getJobUrl(){return jobUrl;} public void setJobUrl(String v){jobUrl=v;}
  public String getSalary(){return salary;} public void setSalary(String v){salary=v;} public String getRecruiterName(){return recruiterName;} public void setRecruiterName(String v){recruiterName=v;} public String getRecruiterEmail(){return recruiterEmail;} public void setRecruiterEmail(String v){recruiterEmail=v;}
  public LocalDate getAppliedDate(){return appliedDate;} public void setAppliedDate(LocalDate v){appliedDate=v;} public LocalDate getDeadline(){return deadline;} public void setDeadline(LocalDate v){deadline=v;} public LocalDate getNextFollowUpDate(){return nextFollowUpDate;} public void setNextFollowUpDate(LocalDate v){nextFollowUpDate=v;}
  public String getNotes(){return notes;} public void setNotes(String v){notes=v;} public Instant getCreatedAt(){return createdAt;} public Instant getUpdatedAt(){return updatedAt;}
}
