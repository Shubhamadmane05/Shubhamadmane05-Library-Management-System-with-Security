package com.library.model;

import jakarta.persistence.Id;





import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Student {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String email;
   
    private String role;

    @Column(nullable = false, updatable = false)
    private String createdAt;

    @Column(nullable = false)
    private String updatedAt;
    
    @JsonIgnore
    @OneToMany(mappedBy = "borrowedBy") 
    private List<Books> borrowedBooks;
}

