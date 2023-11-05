import React, { Component } from 'react';

class BookAddForm extends Component {

  state = {
    bookNew: { title: '', author: '' }
  };

  handleTitleChange = (title) => {
    this.setState({bookNew: {...this.state.bookNew, title }})
  }

  handleAuthorChange = (author) => {
    this.setState({bookNew: {...this.state.bookNew, author }})
  }

  addBook = (e) => {
    e.preventDefault() // prevent submitting of the form

    // validate
    let matchResult = this.state.bookNew.title.match(/\w{3,}/)
    if(matchResult) {
      // send our book "upwards"
      this.props.addBook(this.state.bookNew)
      this.setState({ 
        bookNew: { title: "", author: "" },
        errors: "" 
      })
    }
    else {
      this.setState({ errors: "Title must be minimum 3 characters" })
    }

  }

  render() {

    let bookNew = this.state.bookNew

    return (
      <>
      <form className="form-add" onSubmit={ this.addBook }>
        <input
          type="text"
          placeholder="Book title..."
          value={bookNew.title}
          onChange={(e) => this.handleTitleChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author..."
          value={bookNew.author}
          onChange={(e) => this.handleAuthorChange(e.target.value)}
        />
        <button type="submit">ADD</button>
      </form>
      <div className="errors">{this.state.errors}</div>
      </>
    );
  }
}

export default BookAddForm;
