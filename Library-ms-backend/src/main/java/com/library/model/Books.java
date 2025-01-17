package com.library.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Books {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String status; // 'available' or 'borrowed'

    @Column(nullable = false)
    private Integer publishedYear;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; 

    @Column(nullable = false)
    private LocalDateTime updatedAt; 
    
    @JsonIgnore
    @ManyToOne 
    @JoinColumn(name = "borrowed_by_user_id" , nullable = true) 
    private Student borrowedBy;

    
    public Books() {}

    
    public Books(UUID id, String title, String author, String status, Integer publishedYear, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.status = status;
        this.publishedYear = publishedYear;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(Integer publishedYear) {
        this.publishedYear = publishedYear;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

	public Student getBorrowedBy() {
		return borrowedBy;
	}

	public void setBorrowedBy(Student borrowedBy) {
		this.borrowedBy = borrowedBy;
	}
    
 
}
