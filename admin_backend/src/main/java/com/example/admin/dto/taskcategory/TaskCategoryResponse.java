package com.example.admin.dto.taskcategory;

import com.example.admin.dto.user.UserResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskCategoryResponse {
	private Long id;
	private String title;
	//User情報を返せばEntityの構造と同じにできる
	private UserResponse userResponse;
	
	/*
	 JSON{
  "id": 1,
  "title": "仕事",
  "user": {
    "id": 1,
    "name": "太郎"
  }
	 */
}
