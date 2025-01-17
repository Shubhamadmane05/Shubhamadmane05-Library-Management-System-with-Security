import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import bookimg from '../assets/book1.jpg';
import axios from 'axios';
import Navbar from './Navbar';
import Search from './Search';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.roles ? decodedToken.roles[0] : null;
      console.log('Decoded Token:', decodedToken);

      // Ensure the user is a student before fetching the books
      if (userRole !== 'ROLE_STUDENT') {
        console.log('You must be a student to view the books');
        return;
      }

      const fetchBooks = async () => {
        try {
          const response = await axios.get('http://localhost:8080/books/viewBooks', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Log the response to inspect the structure
          console.log('Fetched Books Response:', response);

          if (response.data && Array.isArray(response.data)) {
            setBooks(response.data);
          } else {
            console.error('Books data is not in the correct format:', response.data);
            setBooks([]);
          }
        } catch (error) {
          console.error('Error fetching books:', error);
          setBooks([]); // Ensure an empty array is set on error
        }
      };

      fetchBooks();
    } else {
      console.log('You need to log in to view books');
    }
  }, [token, isAuthenticated]);

  const handleBorrow = async (bookId) => {
    const decodedToken = jwtDecode(token); // Decode the JWT token
    const studentUsername = decodedToken.sub; // Get the student username from the token
  
    // Confirm borrow action
    if (window.confirm('Are you sure you want to borrow this book?')) {
      try {
        // Use template literals properly in the API URL
        const response = await axios.patch(
          `http://localhost:8080/books/${bookId}/borrow?username=${studentUsername}`, // Correct query parameter 'username'
          {}, // Empty body for the PATCH request
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in headers
            },
          }
        );
  
        
        alert('Book borrowed successfully!');
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId ? { ...book, status: 'borrowed' } : book
          )
        );
      } catch (error) {
       
        console.error('Error borrowing book:', error.response || error.message);
        alert('Failed to borrow the book.');
      }
    }
};

  const handleReturn = async (bookId) => {
    if (window.confirm('Are you sure you want to return this book?')) {
      try {
        const response = await axios.patch(
          `http://localhost:8080/books/${bookId}/return`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const updatedBook = response.data;
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId
              ? { ...book, status: updatedBook.status, borrowedBy: updatedBook.borrowedBy }
              : book
          )
        );
  
        alert('Book returned successfully!');
      } catch (error) {
        console.error('Error returning book:', error);
        alert('Failed to return the book.');
      }
    }
  };
  

  if (!isAuthenticated) {
    return <div className="text-center text-red-500 font-semibold">Please log in to see the books.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />
      <Search />
      <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">Available Books</h2>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-200"
            >
              <img
                src={bookimg}
                alt="Book Cover"
                className="w-60 h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
             

              <p className="text-gray-600">
                <strong>Author:</strong> {book.author}
              </p>
              <p className="text-gray-600 text-bold">
                <strong>Status:</strong> {book.status}
              </p>
              <p className="text-gray-600">
                <strong>Published Year:</strong> {book.publishedYear}
              </p>
              <p className="text-gray-600">
                <strong>Created At:</strong> {new Date(book.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>Updated At:</strong> {new Date(book.updatedAt).toLocaleDateString()}
              </p>

              {/* Conditional rendering of Borrow and Return buttons */}
              {book.status === 'Available' ? (
                <button
                  onClick={() => handleBorrow(book.id)}
                  className="bg-green-500 text-white px-6 py-2 mt-2 ml-20 rounded-lg text-lg font-medium hover:bg-green-600 transition duration-300 ease-in-out"
                >
                  Borrow
                </button>
              ) : (
                <button
                  onClick={() => handleReturn(book.id)}
                  className="bg-red-500 text-white px-6 py-2 mt-2 ml-20 rounded-lg text-lg font-medium hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Return
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No books available at the moment.</p>
      )}
    </div>
  );
};

export default ViewBooks;
