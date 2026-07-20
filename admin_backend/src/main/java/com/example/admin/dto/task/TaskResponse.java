package com.example.admin.dto.task;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.admin.dto.taskcategory.TaskCategoryResponse;
import com.example.admin.dto.user.UserResponse;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskResponse {
	private Long id;
	private String title;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate endDate;
	private Integer priority;
	private Boolean isFinished;
	private UserResponse user;
	private TaskCategoryResponse taskCategory;
	private LocalDateTime createdDate;
}
