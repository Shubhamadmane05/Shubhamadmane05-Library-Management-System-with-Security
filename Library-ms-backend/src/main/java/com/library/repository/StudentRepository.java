package com.library.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, UUID>{

	Optional<Student> findByUsernameAndPassword(String username, String password);

	Optional<Student> findByUsername(String username);

}
