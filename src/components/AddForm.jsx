import { useState } from "react";

const BookAddForm = (props) => {
  const [bookNew, setBookNew] = useState({ title: "", author: "" });
  const [errors, setErrors] = useState("");

  const handleTitleChange = (title) => {
    setBookNew({ ...bookNew, title });
  };

  const handleAuthorChange = (author) => {
    setBookNew({ ...bookNew, author });
  };

  const addBook = (e) => {
    e.preventDefault(); // prevent submitting of the form

    // validate
    let matchResult = bookNew.title.match(/\w{3,}/);
    if (matchResult) {
      // send our book "upwards"
      props.addBook(bookNew);

      // clear form entries
      setBookNew({ title: "", author: "" });
      setErrors("");
    } else {
      setErrors("Title must be minimum 3 characters");
    }
  };

  return (
    <>
      <form className="form-add" onSubmit={addBook}>
        <input
          type="text"
          placeholder="Book title..."
          value={bookNew.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author..."
          value={bookNew.author}
          onChange={(e) => handleAuthorChange(e.target.value)}
        />
        <button type="submit">ADD</button>
      </form>
      <div className="errors">{errors}</div>
    </>
  );
};

export default BookAddForm;
