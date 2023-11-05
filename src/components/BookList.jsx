import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component {

  render() {

    let bookList = this.props.filteredBookList

    let jsxBookList = bookList.map((book) => (
      <Book
        key={book.title} 
        book={book}
        editBook={this.props.editBook} 
        deleteBook={this.props.deleteBook} 
      ></Book>
    ))
  
    return (
      <div className="books">
        { bookList.length > 0 ? jsxBookList : 
        <p>No Books available</p> }
      </div>
    );
  }

}
 
export default BookList;