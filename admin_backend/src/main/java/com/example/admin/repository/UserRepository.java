package com.example.admin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.admin.repository.entity.User;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	//ユーザー情報取得
	Optional<User> findByNameAndDeletedFalse(String name);
	
	Optional<User> findByIdAndDeletedFalse(Long id);
}
