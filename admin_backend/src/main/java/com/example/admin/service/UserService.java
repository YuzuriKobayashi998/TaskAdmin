package com.example.admin.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.admin.dto.user.LoginRequest;
import com.example.admin.dto.user.UserCreateRequest;
import com.example.admin.dto.user.UserResponse;
import com.example.admin.dto.user.UserUpdateRequest;
import com.example.admin.repository.TaskCategoryRepository;
import com.example.admin.repository.TaskRepository;
import com.example.admin.repository.UserRepository;
import com.example.admin.repository.entity.Task;
import com.example.admin.repository.entity.TaskCategory;
import com.example.admin.repository.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final TaskRepository taskRepository;
	private final TaskCategoryRepository taskCategoryRepository;
	private final PasswordEncoder passwordEncoder;
	
	//User(DB)からResponseでフロントに返すためにデータを移し替える処理
	private UserResponse convertToResponse(User user) {
		UserResponse userResponse = new UserResponse();
		userResponse.setId(user.getId());
		userResponse.setName(user.getName());
		return userResponse;
	}
	
	//ログイン処理
	public UserResponse login(LoginRequest request) {
		User user = userRepository.findByNameAndDeletedFalse(request.getName())
				.orElseThrow(() -> new RuntimeException("ユーザーが存在しません"));
		
		boolean isMache = passwordEncoder.matches(
				request.getPassword(),
				user.getPassword()
				);
		if(!isMache) {
			throw new RuntimeException("パスワードが違います");
		}
		//JWTを返すように変更予定
		return convertToResponse(user);
	}
	
	//ユーザー登録
	public UserResponse create(UserCreateRequest request) {
		User user = new User();
		user.setName(request.getName());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		userRepository.save(user);
		return convertToResponse(user);
	}
	
	//ユーザー編集
	public UserResponse update(UserUpdateRequest request) {
		Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();
	    User user = (User) authentication.getPrincipal();
	    Long userId = user.getId();
		if(request.getName() != null && !request.getName().isBlank()) {
			user.setName(request.getName());
		}
		
		if (request.getPassword() != null && !request.getPassword().isBlank()) {
		    user.setPassword(passwordEncoder.encode(request.getPassword()));
		}
		userRepository.save(user);
		return convertToResponse(user);
	}
	
	//ユーザー情報取得
	public UserResponse getCurrentUser() {
		Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();
	    User user = (User) authentication.getPrincipal();
	    Long userId = user.getId();
		return convertToResponse(user);
	}
	
	@Transactional
	//ユーザー消去
	public void delete() {
		Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();
	    User user = (User) authentication.getPrincipal();
	    Long userId = user.getId();
		//ユーザーを削除したらタスクも削除する
		List<Task> tasks = taskRepository.findByUser_IdAndDeletedFalse(userId);
		tasks.forEach(task -> task.setDeleted(true)); 
		taskRepository.saveAll(tasks);
		
		//ユーザーを削除したらタスクカテゴリも削除する
		List<TaskCategory> taskCategories = taskCategoryRepository.findByUser_IdAndDeletedFalse(userId);
		taskCategories.forEach(taskCategory -> taskCategory.setDeleted(true));
		taskCategoryRepository.saveAll(taskCategories);
		
		user.setDeleted(true);
		userRepository.save(user);
	}
}
