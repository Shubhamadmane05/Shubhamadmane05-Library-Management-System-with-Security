package com.library.controller;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.dto.BookDTO;
import com.library.model.Books;
import com.library.model.Student;
import com.library.repository.BooksRepository;
import com.library.service.BookService;
import com.library.service.StudentService;

import org.springframework.security.access.annotation.Secured;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;
    
    @Autowired
    private StudentService studentService;
    
    @Autowired
    private BooksRepository booksRepository;
   
    @Secured("ROLE_ADMIN")
    @PostMapping("/create")
    public ResponseEntity<Books> createBook(@RequestBody Books books) {
        Books createdBook = bookService.addBook(books);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

   
    @Secured("ROLE_ADMIN")
    @PutMapping("/update/{id}")
    public ResponseEntity<Books> updateBook(@PathVariable UUID id, @RequestBody Books books) {
        Books updatedBook = bookService.updateBook(id, books);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable UUID id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Books> getBook(@PathVariable UUID id) {
        Books book = bookService.getBook(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @Secured("ROLE_STUDENT")
    @GetMapping("/getBooks")
    
    public ResponseEntity<List<Books>> getAllBooks() {
        List<Books> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
    
    @GetMapping("/viewBooks")
    public ResponseEntity<List<Books>> viewAllBooks() {
        List<Books> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
    

    
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateBookStatus(@PathVariable UUID id, @RequestParam String status) {
        // Validate the status
        if (!isValidStatus(status)) {
            return ResponseEntity.badRequest().body("Invalid status value: " + status);
        }

        try {
            
            Books updatedBook = bookService.updateBookStatus(id, status);
            return ResponseEntity.ok(updatedBook);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    private boolean isValidStatus(String status) {
        List<String> validStatuses = Arrays.asList("Available", "borrowed");
        return validStatuses.contains(status);
    }

    @GetMapping("/api/search")
    public ResponseEntity<List<Books>> searchBooks(
        @RequestParam String query, 
        @RequestParam String searchBy) {
        
        List<Books> books;
        if ("book".equals(searchBy)) {
            books = booksRepository.findByTitleContaining(query); 
        } else if ("author".equals(searchBy)) {
            books = booksRepository.findByAuthorContaining(query); 
        } else {
            return ResponseEntity.badRequest().build(); 
        }

        return ResponseEntity.ok(books);
    }
    
    @PatchMapping("/{bookId}/borrow")
    public ResponseEntity<?> borrowBook(@PathVariable UUID bookId, @RequestParam String username) {
        System.out.println("Borrow book API called with bookId: " + bookId + " and username: " + username);

        try {
           
            Books book = bookService.findById(bookId);
            if (book == null) {
                System.out.println("Book not found with ID: " + bookId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found.");
            }

           
            Student student = studentService.findByUserName(username); 
            if (student == null) {
                System.out.println("Student not found with username: " + username);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
            }

            // Validate book availability and student role
            if (!book.getStatus().equalsIgnoreCase("Available")) {
                System.out.println("Book is not available.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Book is not available for borrowing.");
            }

            if (!student.getRole().equalsIgnoreCase("ROLE_STUDENT")) {
                System.out.println("User is not a student.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only students can borrow books.");
            }

            book.setStatus("borrowed");
            book.setBorrowedBy(student);

            
            bookService.addBook(book);

            System.out.println("Book borrowed successfully.");
            return ResponseEntity.ok(new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getStatus(),
                student.getId()
            ));
        } catch (Exception e) {
            System.err.println("Error while borrowing book: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while borrowing the book.");
        }
    }
    
    @PatchMapping("/{id}/return")
    public Books returnBook(@PathVariable UUID id) {
        Books book = bookService.findById(id);

        if (book != null && "borrowed".equals(book.getStatus())) {
            System.out.println("Before update - Status: " + book.getStatus() + ", BorrowedBy: " + book.getBorrowedBy());
            
            book.setStatus("Available");
            book.setBorrowedBy(null);

            Books updatedBook = bookService.addBook(book);

            System.out.println("After update - Status: " + updatedBook.getStatus() + ", BorrowedBy: " + updatedBook.getBorrowedBy());

            return updatedBook;
        }

        return null;
    }

}
