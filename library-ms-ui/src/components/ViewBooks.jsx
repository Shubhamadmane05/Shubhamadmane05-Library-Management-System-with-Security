import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import bookimg from '../assets/book1.jpg';
import axios from 'axios';
import Navbar from './Navbar';


const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.roles ? decodedToken.roles[0] : null;
      console.log('Decoded Token:', decodedToken);

      

      const fetchBooks = async () => {
        try {
          const response = await axios.get('http://localhost:8080/books/viewBooks', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

         
          console.log('Fetched Books Response:', response);

          if (response.data && Array.isArray(response.data)) {
            setBooks(response.data);
          } else {
            console.error('Books data is not in the correct format:', response.data);
            setBooks([]);
          }
        } catch (error) {
          console.error('Error fetching books:', error);
          setBooks([]); 
        }
      };

      fetchBooks();
    } else {
      console.log('You need to log in to view books');
    }
  }, [token, isAuthenticated]);

  const handleBorrow = async (bookId) => {
    const decodedToken = jwtDecode(token); // Decode the JWT token
    const studentUsername = decodedToken.sub;
  
    if (window.confirm('Are you sure you want to borrow this book?')) {
      try {
       
        const response = await axios.patch(
          `http://localhost:8080/books/${bookId}/borrow?username=${studentUsername}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, 
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
        // API call to return the book
        const response = await axios.patch(
          `http://localhost:8080/books/${bookId}/return`, // Corrected URL format
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
              ? { ...book, status: 'Available', borrowedBy: null } 
              : book
          )
        );
  
        alert('Book returned successfully!');
      } catch (error) {
        console.error('Error returning book:', error.response || error.message);
        alert('Failed to return the book.');
      }
    }
  };
  
  if (!isAuthenticated) {
    return <div className="text-center text-red-500 font-semibold">Please log in to see the books.</div>;
  }
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
   
  };
  
  const filteredBooks = books.filter((book) => {
    
    const searchText = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText)
    );
  });
  
return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <Navbar />
    <div className="flex justify-center items-center flex-col mb-6">
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full  p-4 mt-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
    <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">Available Books</h2>
    {filteredBooks.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
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
            <p className="text-gray-600 text-bolder ">
              <strong>Status:</strong> {book.status}
            </p>
            <p className="text-gray-600">
              <strong>Published Year:</strong> {book.publishedYear}
            </p>
            <p className="text-gray-600 text-bolder ">
              <strong>Quantity:</strong> {book.quantity}
            </p>
            <p className="text-gray-600">
              <strong>Last Updated At:</strong> {new Date(book.updatedAt).toLocaleDateString()}
            </p>

            
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
