package com.example.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.admin.dto.task.TaskCreateRequest;
import com.example.admin.dto.task.TaskResponse;
import com.example.admin.dto.task.TaskUpdateRequest;
import com.example.admin.dto.taskcategory.TaskCategoryResponse;
import com.example.admin.repository.TaskCategoryRepository;
import com.example.admin.repository.TaskRepository;
import com.example.admin.repository.UserRepository;
import com.example.admin.repository.entity.Task;
import com.example.admin.repository.entity.TaskCategory;
import com.example.admin.repository.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
	private final TaskRepository taskRepository;
	private final UserRepository userRepository;
	private final TaskCategoryRepository taskCategoryRepository;
	
	private TaskResponse convertToResponse(Task task) {
		TaskResponse response = new TaskResponse();
		response.setId(task.getId());
		response.setTitle(task.getTitle());
		response.setStartDate(task.getStartDate());
		response.setEndDate(task.getEndDate());
		response.setPriority(task.getPriority());
		response.setFinished(task.getFinished());
		response.setTaskCategory(convertToResponse(task.getCategory()));
		return response;
	}
	
	private TaskCategoryResponse convertToResponse(TaskCategory category) {
	    TaskCategoryResponse response = new TaskCategoryResponse();

	    response.setId(category.getId());
	    response.setTitle(category.getTitle());
	    return response;
	}
	
	public List<TaskResponse> findAllByTaskCategoryIdAndCurrentUser(Long taskCategoryId) {
		Long userId = 1L;
		List<Task> tasks = taskRepository.findByCategory_IdAndUser_IdAndDeletedFalse(taskCategoryId,userId);
		return tasks.stream()
				.map(this::convertToResponse)
				.toList();
	}
	
	public TaskResponse findByIdAndUser_IdAndDeletedFalse(Long id) {
		Long userId = 1L;
		Task task = taskRepository.findByIdAndUser_IdAndDeletedFalse(id, userId)
				.orElseThrow(() -> new RuntimeException("タスクが存在しません"));
		return convertToResponse(task);
	}
	
	public TaskResponse create(TaskCreateRequest request) {
		Long userId = 1L;
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("ユーザーが存在しません"));
		
		TaskCategory taskCategory = taskCategoryRepository.findByIdAndUser_IdAndDeletedFalse(request.getTaskCategoryId(), userId)
				.orElseThrow(() -> new RuntimeException("タスクカテゴリが存在しません"));
		
		Task task = new Task();
		task.setTitle(request.getTitle());
		task.setStartDate(request.getStartDate());
		task.setEndDate(request.getEndDate());
		task.setPriority(request.getPriority());
		task.setFinished(request.getIsFinished());
		task.setUser(user);
		task.setCategory(taskCategory);
		
		taskRepository.save(task);
		return convertToResponse(task);
		
	}
	
	public TaskResponse update(Long taskId, TaskUpdateRequest request) {
		Long userId = 1L;
		Task task = taskRepository.findByIdAndUser_IdAndDeletedFalse (taskId, userId)
				.orElseThrow(() -> new RuntimeException("タスクが存在しません"));
		if(request.getTitle() != null) {
		    task.setTitle(request.getTitle());
		}
		
		if(request.getStartDate() != null) {
		    task.setStartDate(request.getStartDate());
		}

		if(request.getEndDate() != null) {
		    task.setEndDate(request.getEndDate());
		}

		if(request.getPriority() != null) {
		    task.setPriority(request.getPriority());
		}

		if(request.getIsFinished() != null) {
		    task.setFinished(request.getIsFinished());
		}
		taskRepository.save(task);
		return convertToResponse(task);
		
	}
	
	public void delete(Long taskId) {
		Long userId = 1L;
		Task task = taskRepository.findByIdAndUser_IdAndDeletedFalse (taskId, userId)
				.orElseThrow(() -> new RuntimeException("タスクが存在しません"));
		task.setDeleted(true);
		taskRepository.save(task);
	}
}
