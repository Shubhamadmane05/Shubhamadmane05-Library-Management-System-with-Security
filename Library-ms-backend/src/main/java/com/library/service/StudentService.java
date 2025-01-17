package com.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.library.model.Student;
import com.library.repository.StudentRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;


	@Service
	public class StudentService {

	    @Autowired
	    private StudentRepository studentRepository;

	    @Autowired
	    private PasswordEncoder passwordEncoder;

	    public Student createStudent(Student student) {
	       
	        student.setRole("ROLE_STUDENT");

	        
	        student.setPassword(passwordEncoder.encode(student.getPassword()));

	       
	        String currentTimestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	        student.setCreatedAt(currentTimestamp);
	        student.setUpdatedAt(currentTimestamp);

	        return studentRepository.save(student);
	    }

		public Student findByUserName(String username) {
			return studentRepository.findByUsername(username).get();
		}
		
		public List<Student> getStduents(){
	    	return studentRepository.findAll();
	    }
	   
	}
