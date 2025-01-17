// booksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [], // Store the books array
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload; // Set books in the state
    },
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;
