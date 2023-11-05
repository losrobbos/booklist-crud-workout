import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBan, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Book = ({ book, editBook, deleteBook }) => {
  const [editMode, setEditMode] = useState(false);
  const [bookEdit, setBookEdit] = useState(book);

  // save input values to state
  const handleBookUpdate = (e) => {
    console.log(`Updated ${e.target.name} with value ${e.target.value}`);
    setBookEdit({ ...bookEdit, [e.target.name]: e.target.value });
  };

  // edit book in state
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // update book in central state
    editBook(bookEdit);
    // clear edit mode of book
    setEditMode(false);
  };

  return (
    <div key={book.title} className="book">
      {/* VIEW mode => just show book info in normal divs */}
      {!editMode && (
        <div
          className="book-details"
          onClick={() => setEditMode({ editMode: !editMode })}
        >
          <div className="book-title">{book.title}</div>
          <div className="book-author">{book.author}</div>
        </div>
      )}
      {/* EDIT mode => show book info in inline FORM! So we can update the info */}
      {editMode && (
        <form className="book-form-edit" onSubmit={handleEditSubmit}>
          <input
            type="text"
            className="book-title"
            name="title"
            onChange={handleBookUpdate}
            defaultValue={book.title}
          />
          <input
            type="text"
            className="book-author"
            name="author"
            onChange={handleBookUpdate}
            defaultValue={book.author}
          />
          <input
            type="submit"
            style={{ visibility: "hidden", width: 0, height: 0 }}
          />
        </form>
      )}
      <div className="book-actions">
        <FontAwesomeIcon
          icon={editMode ? faBan : faEdit}
          onClick={() => setEditMode(!editMode)}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={() => deleteBook(book.id)}
        />
      </div>
    </div>
  );
};

export default Book;
