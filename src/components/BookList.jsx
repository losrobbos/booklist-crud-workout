import Book from "./Book";

const BookList = ({ books, editBook, deleteBook }) => {

  let jsxBookList = books.map((book) => (
    <Book
      key={book.title}
      book={book}
      editBook={editBook}
      deleteBook={deleteBook}
    ></Book>
  ));

  return (
    <div className="books">
      {books.length > 0 ? jsxBookList : <p>No Books available</p>}
    </div>
  );
};

export default BookList;
