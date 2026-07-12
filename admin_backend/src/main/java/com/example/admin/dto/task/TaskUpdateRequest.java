package com.example.admin.dto.task;

import java.time.LocalDate;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskUpdateRequest {
		private String title;
		
		@JsonFormat(pattern = "yyyy-MM-dd")
		private LocalDate startDate;
		
		@JsonFormat(pattern = "yyyy-MM-dd")
		private LocalDate endDate;
		
		@Min(1)
		@Max(3)
		private Integer priority;
		
		private Boolean isFinished;
		
		private Long taskCategoryId;
	}
