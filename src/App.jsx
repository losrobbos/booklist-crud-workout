import { useEffect, useState } from "react";
import "./App.scss";
import FilterForm from "./components/FilterForm";
import BookList from "./components/BookList";
import BookAddForm from "./components/AddForm";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useState(() => {
    // grab books from local storage
    let books = localStorage.getItem("BOOKS");

    // if no books found
    if (!books) {
      books = [
        { id: 1, title: "Guide to Nodejs", author: "Robert Ristock" },
        { id: 2, title: "Guide to SCSS", author: "Vasilis Psychas" },
      ];
    } else {
      // localStroage stores everything as STRINGS
      // so we need to convert the string back to an JavaScript array
      books = JSON.parse(books);
    }

    setBooks(books);
  }, []);

  // listen to each change on the books array
  // => use it to save books to localstorage on every change
  useEffect(() => {
    // books changed - update local storage
    localStorage.setItem("BOOKS", JSON.stringify(books));
  }, [books]);

  const filterBooks = () => {
    if (!searchTerm) return books;

    let searchTermLc = searchTerm.toLowerCase();
    // no search term from user? just display ALL books

    // there is a search term => filter books by search term using filter method
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTermLc)
    );
  };

  const addBook = (bookNew) => {
    // no book title given? => cancel adding of book
    if (!bookNew.title) return;

    // add new book to list of books + add an unique ID to new book before adding it
    let booksCopy = [...books, { ...bookNew, id: new Date() }];

    // update state
    setBooks(booksCopy);
  };

  const editBook = (bookUpdated) => {
    console.log("[EDIT BOOK]", bookUpdated);

    // update book
    let booksUpdated = books.map((book) => {
      // find the book the user wants to update by its ID!
      if (bookUpdated.id === book.id) {
        book = { ...book, ...bookUpdated }; // merge old book data with NEW book data
      }
      return book;
    });
    setBooks(booksUpdated);
  };

  const deleteBook = (id) => {
    if (!window.confirm("REALLY delete this unique thingy?")) {
      return;
    }

    // filter out all the books we want to keep (so exclude the one to delete by its ID)
    let booksKeep = books.filter((book) => book.id !== id);
    setBooks(booksKeep);
  };

  // apply current search filter
  // (if none => all books will get fetched)
  const filteredBooks = filterBooks();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book List</h1>
      </header>
      <main>
        <div className="books-container">
          <FilterForm
            searchTerm={searchTerm}
            searchTermChange={setSearchTerm}
          ></FilterForm>
          <BookList
            books={filteredBooks}
            editBook={editBook}
            deleteBook={deleteBook}
          ></BookList>
          <BookAddForm addBook={addBook}></BookAddForm>
        </div>
      </main>
      <footer>&copy; Books Unlimited Org - Give us all your moneyyy</footer>
    </div>
  );
}

export default App;
