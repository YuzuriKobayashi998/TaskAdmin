package com.example.admin.dto.user;

import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
	@NotBlank(message = "ユーザー名を入力してください")
	private String name;
	@NotBlank(message = "パスワードを入力してください")
	private String password;
}
