import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SearchBook from './components/search'
import './css/App.css'
import * as BooksAPI from './BooksAPI'
class App extends React.Component {
  state = {
    books: [],
}


updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(
        this.setState(oldState => ({
            books: oldState.books.map(b => {
                if (b.id === book.id) {
                    b.shelf = shelf;
                }
                return b;
            })
        })
        )
    )
}


//added array of books to the state
componentWillMount() {
    BooksAPI.getAll().then(books => {
        this.setState({ books })
        console.log(books)
    })
}


  render() {

    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <HomePage updateShelf={this.updateShelf} books={this.state.books}/>
        )} />
        <Route path="/search" render={() => (
          <SearchBook updateShelf={this.updateShelf} books={this.state.books}/>
        )} />

      </div>
    )
  }
}

export default App