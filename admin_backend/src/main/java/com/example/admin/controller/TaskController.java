package com.example.admin.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.admin.dto.task.TaskCreateRequest;
import com.example.admin.dto.task.TaskResponse;
import com.example.admin.dto.task.TaskUpdateRequest;
import com.example.admin.service.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {
	private final TaskService taskService;
	@GetMapping
	public List<TaskResponse> findAll(@PathVariable Long taskCaLongId){
		return taskService.findAllByTaskCategoryIdAndCurrentUser(taskCaLongId);
	}
	
	@PostMapping
	public TaskResponse create(@Valid @RequestBody TaskCreateRequest request) {
		return taskService.create(request);
	}
	
	@PutMapping("/{id}")
	public TaskResponse update(@Valid @PathVariable Long id, @RequestBody TaskUpdateRequest request) {
		return taskService.update(id, request);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		taskService.delete(id);
	}
	@GetMapping("/{id}")
	public TaskResponse findByIdAndUser_IdAndDeletedFalse(@PathVariable Long id) {
	    return taskService.findByIdAndUser_IdAndDeletedFalse(id);
	}
}

