import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./Navbar";
import Search from "./Search";
import logo from "../assets/book2.jpg"; 

const ManageBooks = () => {
  const { token } = useSelector((state) => state.auth);
  const [books, setBooks] = useState([]);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    status: "",
    publishedYear: "",
  });

  // Fetch books 
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/books/getBooks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [token]);

 
  const handleAddBook = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/books/create",
        newBook,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks((prevBooks) => [...prevBooks, response.data]);
      setNewBook({ title: "", author: "", status: "", publishedYear: "" });
      setAddFormVisible(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Update book status
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Available" ? "borrowed" : "Available";
      await axios.patch(
        `http://localhost:8080/books/${id}/status`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { status: newStatus },
        }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, status: newStatus } : book
        )
      );
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  // Edit book
  const handleEditBook = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/books/update/${editBook.id}`,
        editBook,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editBook.id ? response.data : book
        )
      );
      setEditBook(null); // Close the edit form
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Delete book
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 mb-4">
      <Navbar />
      <Search />
      <h1 className="text-2xl font-bold mb-4">Manage Books</h1>

   
      <button
        onClick={() => setAddFormVisible(!isAddFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {isAddFormVisible ? "Close Add Book Form" : "Add Book"}
      </button>

     
      {isAddFormVisible && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className="border p-2 rounded"
            />
            <select
              value={newBook.status}
              onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="Available">Available</option>
              <option value="borrowed">borrowed</option>
            </select>
            <input
              type="number"
              placeholder="Published Year"
              value={newBook.publishedYear}
              onChange={(e) =>
                setNewBook({ ...newBook, publishedYear: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleAddBook}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Book
          </button>
        </div>
      )}

     
      {editBook && (
        <div className="bg-gray-100 p-4 rounded mt-6">
          <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={editBook?.title || ""}
              onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={editBook?.author || ""}
              onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
              className="border p-2 rounded"
            />
            <select
              value={editBook?.status || ""}
              onChange={(e) => setEditBook({ ...editBook, status: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="Available">Available</option>
              <option value="borrowed">borrowed</option>
            </select>
            <input
              type="number"
              value={editBook?.publishedYear || ""}
              onChange={(e) =>
                setEditBook({ ...editBook, publishedYear: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleEditBook}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Save Changes
          </button>
        </div>
      )}

     
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Published Year</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="text-center">
                <td className="border p-2">
                  <img src={logo} alt="Book Logo" className="h-10 w-10 mx-auto rounded" />
                </td>
                <td className="border p-2">{book.title}</td>
                <td className="border p-2">{book.author}</td>
                <td className="border p-2">{book.status}</td>
                <td className="border p-2">{book.publishedYear}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleToggleStatus(book.id, book.status)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => setEditBook(book)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
