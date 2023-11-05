import React, { Component } from 'react';
import './App.scss';
import FilterForm from './components/FilterForm';
import BookList from './components/BookList';
import BookAddForm from './components/AddForm';

class App extends Component {

  state = {
    books: [],
    searchTerm: ''
  }

  componentDidMount() {

    let books = localStorage.getItem("BOOKS")

    if(!books) {
      books = [
        {id: 1, title: "Guide to Nodejs", author: "Robert Ristock" },
        {id: 2, title: "Guide to SCSS", author: "Vasilis Psychas" }
      ]
    }
    else {
      books = JSON.parse(books) // convert string to JSON
    }

    this.setState({ books })
  }


  // check WHAT changed in state! and react to that!
  // use it to save books to localstorage on every change
  componentDidUpdate(prevProps, prevState) {

    // check if state of books has changed!
    if(prevState.books === this.state.books) {
      return
    }

    // books changed - update local storage
    localStorage.setItem("BOOKS", JSON.stringify(this.state.books))
  }

  handleSearchTermChange = (searchTerm) => {
    console.log(searchTerm)
    this.setState({ searchTerm })
  }

  filterBooks = () => {
    let searchTerm = this.state.searchTerm.toLowerCase()
    if(!searchTerm) return this.state.books
    // filter books by search term
    return this.state.books.filter(book => 
      book.title.toLowerCase().includes(searchTerm))
  }

  addBook = (bookNew) => {

    // no book title given? => cancel adding of book
    if(!bookNew.title) return

    // add new book to list of books
    let booksCopy = [...this.state.books, {...bookNew, id: new Date()}]

    // update state
    this.setState({ books: booksCopy })
  }

  editBook = (bookUpdated) => {

    console.log("[EDIT BOOK]", bookUpdated)

    // update book
    let booksUpdated = this.state.books.map(book => {
      if(bookUpdated.id === book.id) {
        book = {...book, ...bookUpdated} // merge objects
      }
      return book
    })
    this.setState({ books: booksUpdated })
  }

  deleteBook = (id) => {

    if(!window.confirm("Really delete this unique thing?")) {
      return
    }

    let booksKeep = this.state.books.filter(book => book.id !== id)
    this.setState({
      books: booksKeep
    })
  }
  
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Book List</h1>
        </header>
        <main>
          <div className="books-container">
          <FilterForm 
            searchTerm={this.state.searchTerm}
            searchTermChange={this.handleSearchTermChange}></FilterForm>
          <BookList 
            filteredBookList={this.filterBooks()} 
            editBook={this.editBook} 
            deleteBook={this.deleteBook} 
          ></BookList>
          <BookAddForm 
            bookNew={this.state.bookNew} 
            addBook={this.addBook}
            titleChange={this.handleTitleInputChange}
            authorChange={this.handleAuthorInputChange} 
          ></BookAddForm>
          </div>
        </main>
        <footer>&copy; Footer</footer>
      </div>
    );
  }
}

export default App;
