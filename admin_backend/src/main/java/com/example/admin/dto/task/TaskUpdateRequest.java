package com.example.admin.dto.task;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskUpdateRequest {
		private String title;
		
		
		@FutureOrPresent(message = "期限日は今日以降を入力してください")
		@JsonFormat(pattern = "yyyy-MM-dd")
		private LocalDate startDate;
		
		@FutureOrPresent(message = "期限日は今日以降を入力してください")
		@JsonFormat(pattern = "yyyy-MM-dd")
		private LocalDate endDate;
		
		@Min(1)
		@Max(3)
		private Integer priority;
		
		private Boolean isFinished;
		
		private Long taskCategoryId;
	}
