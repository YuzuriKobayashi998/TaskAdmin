package com.example.admin.dto.task;

import java.time.LocalDate;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskCreateRequest {
	@NotBlank(message = "タイトルを記入してください")
	private String title;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@NotNull(message = "開始日を記入してください")
	private LocalDate startDate;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@NotNull(message = "終了日を記入してください")
	private LocalDate endDate;
	
	@Min(1)
	@Max(3)
	@NotNull(message = "優先度を記入してください")
	private Integer priority;
	
	@NotNull(message = "タスク完了か未完了かを記入してください")
	private Boolean isFinished;
	
	@NotNull
	private Long taskCategoryId;
}
