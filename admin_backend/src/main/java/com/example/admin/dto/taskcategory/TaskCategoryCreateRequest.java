package com.example.admin.dto.taskcategory;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskCategoryCreateRequest {
	@NotBlank(message = "タイトルを入力してください")
	@Size(max = 20, message = "タイトルは20文字以内で入力してください")
	private String title;
}
