package com.example.admin.dto.taskcategory;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskCategoryResponse {
	private Long id;
	private String title;
    private String description; // 説明
    
    private Boolean isFinished; // 大分類完了フラグ
    private LocalDate dueDate; 
//	//User情報を返せばEntityの構造と同じにできる
//	private UserResponse userResponse;
//	
//	/*
//	 JSON{
//  "id": 1,
//  "title": "仕事",
//  "user": {
//    "id": 1,
//    "name": "太郎"
//  }
//	 */
}
