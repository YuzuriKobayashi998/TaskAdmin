package com.example.admin.dto.taskcategory;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskCategoryUpdateRequest {
	@Size(max = 20, message = "タイトルは20文字以内で入力してください")
	private String title;
	
	@Size(max = 100, message = "説明は100文字以内で入力してください")
    private String description; // 説明
    
    private Boolean isFinished; // 大分類完了フラグ
    
    @FutureOrPresent(message = "期限日は今日以降を入力してください")
    @NotNull(message = "期限日を入力してください")
    private LocalDate dueDate; 
}
