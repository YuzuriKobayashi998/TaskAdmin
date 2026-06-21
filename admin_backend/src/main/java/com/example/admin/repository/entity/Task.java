package com.example.admin.repository.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "tasks")
@Setter
@Getter
public class Task {
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(nullable = false)
	private String title;
	
	@Column(name = "start_date", nullable = false)
	private LocalDate startDate;
	
	@Column(name = "end_date", nullable = false)
	private LocalDate endDate;
	
	@Column(nullable = false)
	private Integer priority;
	
	//booleanは初期設定をしたほうがいい（今回はタスク完了なのでfalse）
	@Column(name = "is_finished", nullable = false)
	private Boolean finished = false;
	
	@Column(name = "created_date", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    @UpdateTimestamp
    private LocalDateTime updatedDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_category_id", nullable = false)
    private TaskCategory category;
    
    @Column(nullable = false)
    private Boolean deleted = false;
}
