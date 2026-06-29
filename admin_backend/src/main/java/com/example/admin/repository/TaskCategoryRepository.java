package com.example.admin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.admin.repository.entity.TaskCategory;

@Transactional //原子性を持たせるためのアノテーション
@Repository
public interface TaskCategoryRepository extends JpaRepository<TaskCategory, Long> {
	// 全件
    List<TaskCategory> findByUser_Id(Long userId);

    // 一覧（メイン）
    List<TaskCategory> findByUser_IdAndDeletedFalse(Long userId);

    // 削除済み一覧（ゴミ箱）
    List<TaskCategory> findByUser_IdAndDeletedTrue(Long userId);

    // 単体取得（削除用・更新用）
    Optional<TaskCategory> findByIdAndUser_IdAndDeletedFalse(Long id, Long userId);
}