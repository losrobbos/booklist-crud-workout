import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBan, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class Book extends Component {

  state = {
    editMode: false,
    bookEdit: { ...this.props.book }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.bookEdit !== this.state.bookEdit) {
      console.log("[componentDidUpdate] Book updated:", this.state.bookEdit)
    }
  }

  // save input values to state
  handleBookUpdate = (e) => {
    console.log(`Updated ${e.target.name} with value ${e.target.value}`)
    let bookUpdated = {...this.state.bookEdit, [e.target.name]: e.target.value }
    this.setState({ bookEdit: bookUpdated })
  }

  // edit book in state
  handleEditSubmit = (e) => {
    e.preventDefault()
    // console.log("Book update:", this.state.bookEdit)
    this.props.editBook(this.state.bookEdit)
    this.setState({ editMode: false })
  }

  render() {

    // fetch prop data
    let { book, deleteBook } = this.props
    let editMode = this.state.editMode

    return (
      <div key={book.title} className="book">
        {!editMode && (
          <div className="book-details" onClick={() => this.setState({ editMode: !editMode })} >
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.author}</div>
          </div>
        )}
        {editMode && (
          <form className="book-form-edit" onSubmit={this.handleEditSubmit} >
            <input
              type="text"
              className="book-title"
              name="title"
              onChange={this.handleBookUpdate}
              defaultValue={book.title}
            />
            <input
              type="text"
              className="book-author"
              name="author"
              onChange={this.handleBookUpdate}
              defaultValue={book.author}
            />
            <input type="submit" style={{visibility: 'hidden', width: 0, height: 0 }} />
          </form>
        )}
        <div className="book-actions">
          <FontAwesomeIcon icon={editMode ? faBan : faEdit} onClick={() => this.setState({ editMode: !editMode })} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteBook(book.id)} />
        </div>
      </div>
    );
  }
}

export default Book;
