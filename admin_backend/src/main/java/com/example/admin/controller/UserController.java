package com.example.admin.controller;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.admin.dto.user.UserCreateRequest;
import com.example.admin.dto.user.UserResponse;
import com.example.admin.dto.user.UserUpdateRequest;
import com.example.admin.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	
	//ユーザー情報の取得
	@GetMapping("/mypage")
	public UserResponse mypage() {
		return userService.getCurrentUser();
	}
	
	//ユーザー登録（DTOから送られたデータを引数で受け取っている）
	@PostMapping
	public UserResponse create(@Valid @RequestBody UserCreateRequest request) {
		return userService.create(request);
	}	
	
	//IDはJWTから取得
	@PutMapping("/mypage")
	public UserResponse update(@Valid @RequestBody UserUpdateRequest request) {
		return userService.update(request);
	}
	
	@DeleteMapping("/mypage")
	public void delete() {
		userService.delete();
	}
	
}
