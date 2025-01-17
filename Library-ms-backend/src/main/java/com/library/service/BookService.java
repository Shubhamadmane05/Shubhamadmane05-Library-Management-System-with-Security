package com.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.library.model.Books;
import com.library.model.Student;
import com.library.repository.BooksRepository;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookService {

    @Autowired
    private BooksRepository booksRepository;

   
    public List<Books> getAllBooks() {
        return booksRepository.findAll();
    }

   
    @Transactional
    public Books addBook(Books book) {
        
        book.setCreatedAt(LocalDateTime.now()); 
        book.setUpdatedAt(LocalDateTime.now()); 
        return booksRepository.save(book);
    }

    // Update an existing book
    public Books updateBook(UUID id, Books bookDetails) {
        Books book = booksRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Book not found with id: " + id)
        );
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPublishedYear(bookDetails.getPublishedYear());
        book.setUpdatedAt(LocalDateTime.now()); // Updated time
        return booksRepository.save(book);
    }

   
    public void deleteBook(UUID id) {
        if (!booksRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id: " + id);
        }
       
        booksRepository.deleteById(id);
        System.out.println("book deleted");
    }

    // Get a book by ID
    public Books getBook(UUID id) {
        return booksRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }
    
    public Books updateBookStatus(UUID id, String status) {
       
        Books book = booksRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Book not found with id: " + id)
        );

        
        book.setStatus(status);
        book.setUpdatedAt(LocalDateTime.now());

        // Save the updated book
        return booksRepository.save(book);
    }

    public Books findById(UUID id) {
        System.out.println("Finding book with ID: " + id);
        Books book = booksRepository.findById(id).orElse(null);
        System.out.println("Found book: " + book);
        return book;
    } 
 }

