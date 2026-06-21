package com.example.admin.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateRequest {
	
	@Size(min = 6, max = 20, message = "ユーザー名は3～20文字で入力してください")
	@NotBlank(message = "ユーザー名を入力してください")
	private String name;
	
	@NotBlank(message = "パスワードを入力してください")
	@Pattern(
		    regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$",
		    message = "パスワードは8～20文字の英数字で入力してください"
		)
	private String password;
}
