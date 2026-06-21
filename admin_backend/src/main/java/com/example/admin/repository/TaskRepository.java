package com.example.admin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.admin.repository.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
	// 全件
    List<Task> findByUserId(Long userId);

    // ユーザー単位で取得（User削除用）
    List<Task> findByUserIdAndDeletedFalse(Long userId);

    // カテゴリ単位で取得（Category削除用）
    List<Task> findByTaskCategoryIdAndUserIdAndDeletedFalse(Long taskCategoryId, Long userId);

    // 単体取得（更新・削除用）
    Optional<Task> findByIdAndUserIdAndDeletedFalse(Long id, Long userId);
}
 