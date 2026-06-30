package com.example.admin.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.admin.dto.user.LoginRequest;
import com.example.admin.dto.user.UserResponse;
import com.example.admin.repository.UserRepository;
import com.example.admin.repository.entity.User;
import com.example.admin.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;
	
	private UserResponse convertToResponse(User user) {
		UserResponse userResponse = new UserResponse();
		userResponse.setId(user.getId());
		userResponse.setName(user.getName());
		return userResponse;
	}
	
	public UserResponse login(LoginRequest request) {
	    User user = userRepository.findByNameAndDeletedFalse(request.getName())
	            .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.UNAUTHORIZED,
	                    "ユーザー名またはパスワードが違います"
	            ));

	    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	        throw new ResponseStatusException(
	                HttpStatus.UNAUTHORIZED,
	                "ユーザー名またはパスワードが違います"
	        );
	    }
        UserResponse response = convertToResponse(user);
        //JwtUtilを使ってJWTトークンを生成し、レスポンスにセットする
        response.setToken(jwtUtil.generateToken(user.getName()));
        return response;
	}
}