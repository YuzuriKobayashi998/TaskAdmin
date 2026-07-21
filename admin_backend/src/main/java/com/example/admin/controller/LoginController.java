package com.example.admin.controller;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.admin.dto.user.LoginRequest;
import com.example.admin.dto.user.UserResponse;
import com.example.admin.service.LoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class LoginController {
	private final LoginService loginService;
	@PostMapping("/login")
	public UserResponse login(@Valid @RequestBody LoginRequest request) {
		System.out.println("★ LOGIN CONTROLLER 到達");
		return loginService.login(request);
	}
}