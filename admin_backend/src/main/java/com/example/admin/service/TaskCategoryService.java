package com.example.admin.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.admin.dto.taskcategory.TaskCategoryCreateRequest;
import com.example.admin.dto.taskcategory.TaskCategoryResponse;
import com.example.admin.dto.taskcategory.TaskCategoryUpdateRequest;
import com.example.admin.repository.TaskCategoryRepository;
import com.example.admin.repository.TaskRepository;
import com.example.admin.repository.UserRepository;
import com.example.admin.repository.entity.Task;
import com.example.admin.repository.entity.TaskCategory;
import com.example.admin.repository.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskCategoryService {
	private final TaskCategoryRepository taskCategoryRepository;
	private final UserRepository userRepository;
	private final TaskRepository taskRepository;
	
	private TaskCategoryResponse convertToResponse(TaskCategory taskCategory) {
		TaskCategoryResponse response = new TaskCategoryResponse();
		response.setId(taskCategory.getId());
		response.setTitle(taskCategory.getTitle());
		response.setIsFinished(taskCategory.getIsFinished());
		response.setDueDate(taskCategory.getDueDate());
		response.setDescription(taskCategory.getDescription());
		return response;
	}
	
	public List<TaskCategoryResponse>  findAllByTaskCategoryIdAndCurrentUser() {
		Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();
		User user = (User) authentication.getPrincipal();	
//	    String username = authentication.getName();
//	    User user = userRepository
//	            .findByNameAndDeletedFalse(username)
//	            .orElseThrow(() -> new RuntimeException("ユーザーが存在しません"));
	    Long userId = user.getId();
		List<TaskCategory> taskCategories = taskCategoryRepository.findByUser_IdAndDeletedFalse(userId);
		//リストを１件ずつconvertに変換して再度リスト化している
		return taskCategories.stream()
	    .map(this::convertToResponse)
	    .toList();
	}
	
	public TaskCategoryResponse findByIdAndUser_IdAndDeletedFalse(Long id) {
		Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();
		User user = (User) authentication.getPrincipal();	
	    Long userId = user.getId();
		TaskCategory taskCategory = taskCategoryRepository.findByIdAndUser_IdAndDeletedFalse(id, userId)
				.orElseThrow(() -> new RuntimeException("タスクカテゴリが存在しません"));
		return convertToResponse(taskCategory);
	}
	
	public TaskCategoryResponse create(TaskCategoryCreateRequest request) {
		Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();
		User user = (User) authentication.getPrincipal();	
	    Long userId = user.getId();
		
		TaskCategory taskCategory = new TaskCategory();
		taskCategory.setTitle(request.getTitle());
		taskCategory.setUser(user);
		taskCategory.setDescription(request.getDescription());
		taskCategory.setIsFinished(request.getIsFinished());
		taskCategory.setDueDate(request.getDueDate());
		
		taskCategoryRepository.save(taskCategory);
		return convertToResponse(taskCategory);
	}
	
	public TaskCategoryResponse update(Long id, TaskCategoryUpdateRequest request) {
	    Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();
	    User loginUser = (User) authentication.getPrincipal();
	    Long userId = loginUser.getId();
		    
		TaskCategory taskCategory =  taskCategoryRepository.findByIdAndUser_IdAndDeletedFalse(id, userId)
				.orElseThrow(() -> new RuntimeException("タスクカテゴリが存在しません"));
		if(request.getTitle() != null && !request.getTitle().isBlank()) {
			taskCategory.setTitle(request.getTitle());
		}
		if(request.getDueDate() != null) {
			taskCategory.setDueDate(request.getDueDate());
		}
		taskCategory.setDescription(request.getDescription());
		System.out.println(authentication.getName());
		taskCategoryRepository.save(taskCategory);
		return convertToResponse(taskCategory);
	}
	
	@Transactional
	public void delete(Long id) {
	    Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();
	    User loginUser = (User) authentication.getPrincipal();
	    Long userId = loginUser.getId();
		
		TaskCategory taskCategory = taskCategoryRepository.findByIdAndUser_IdAndDeletedFalse(id, userId)
				.orElseThrow(() -> new RuntimeException("タスクカテゴリが存在しません"));
		
		List<Task> tasks = taskRepository.findByCategory_IdAndUser_IdAndDeletedFalse(id, userId);
		tasks.forEach(task -> task.setDeleted(true));
		taskRepository.saveAll(tasks);
		
		taskCategory.setDeleted(true);
		taskCategoryRepository.save(taskCategory);
	}
}
