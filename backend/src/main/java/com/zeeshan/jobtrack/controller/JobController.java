package com.zeeshan.jobtrack.controller;
import com.zeeshan.jobtrack.dto.JobDtos.*; import com.zeeshan.jobtrack.entity.*; import com.zeeshan.jobtrack.service.JobService; import jakarta.validation.Valid; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/jobs") public class JobController {private final JobService s;public JobController(JobService s){this.s=s;} private UUID uid(Authentication a){return (UUID)a.getPrincipal();}
 @GetMapping public PageResponse<JobResponse> list(Authentication a,@RequestParam(defaultValue="0")int page,@RequestParam(defaultValue="20")int size,@RequestParam(defaultValue="newest")String sort){return s.list(uid(a),page,size,sort);}
 @GetMapping("/{id}") public JobResponse get(Authentication a,@PathVariable UUID id){return s.get(uid(a),id);}
 @PostMapping public JobResponse create(Authentication a,@Valid @RequestBody JobRequest r){return s.create(uid(a),r);}
 @PutMapping("/{id}") public JobResponse update(Authentication a,@PathVariable UUID id,@Valid @RequestBody JobRequest r){return s.update(uid(a),id,r);}
 @DeleteMapping("/{id}") public void delete(Authentication a,@PathVariable UUID id){s.delete(uid(a),id);}
 @GetMapping("/dashboard") public DashboardResponse dashboard(Authentication a){return s.dashboard(uid(a));}
 @GetMapping("/meta/statuses") public JobStatus[] statuses(){return JobStatus.values();}
 @GetMapping("/meta/work-modes") public WorkMode[] workModes(){return WorkMode.values();}
 @GetMapping("/meta/priorities") public JobPriority[] priorities(){return JobPriority.values();}
}
