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

import com.example.admin.dto.taskcategory.TaskCategoryCreateRequest;
import com.example.admin.dto.taskcategory.TaskCategoryResponse;
import com.example.admin.dto.taskcategory.TaskCategoryUpdateRequest;
import com.example.admin.service.TaskCategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/task-category")
@RequiredArgsConstructor
public class TaskCategoryController {
	public final TaskCategoryService taskCategoryService;
	
	@GetMapping
	public List<TaskCategoryResponse> findAll() {
		return taskCategoryService.findAllByTaskCategoryIdAndCurrentUser();
	}
	
	@PostMapping
	public TaskCategoryResponse create(@Valid @RequestBody TaskCategoryCreateRequest request) {
		return taskCategoryService.create(request);
	}
	
	@PutMapping("/{id}")
	public TaskCategoryResponse update(@Valid @PathVariable Long id,@RequestBody TaskCategoryUpdateRequest request) {
		return taskCategoryService.update(id, request);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		taskCategoryService.delete(id);
	}
	@GetMapping("/{id}")
	public TaskCategoryResponse findByIdAndUser_IdAndDeletedFalse(@PathVariable Long id) {
	    return taskCategoryService.findByIdAndUser_IdAndDeletedFalse(id);
	}
}
