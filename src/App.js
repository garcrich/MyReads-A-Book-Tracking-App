import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SearchBook from './components/search'
import './css/App.css'
import * as BooksAPI from './BooksAPI'
class App extends React.Component {
    state = {
        myReads: [],
        searchedBooks: []
    }

    //added array of books to the state
    componentWillMount() {
        BooksAPI.getAll().then(myReads => {
            if(window.location.href !== "http://localhost:3000/search") {
                this.setState({ myReads })
            } else {
                this.setState({myReads: []})
            }
        })
    }

    searchQuery = (event) => {
        const query = event.target.value
        if (query !== '') { 
          BooksAPI.search(query).then(searchResults => {
            if (!searchResults || searchResults.error) {
              this.setState({ returnedBooks: [] })
              return
            }
            // sync books by mapping over searchResults, and
            // iterating over this.props.books      
            const adjustedBooks = searchResults.map(searchResult => {
              this.props.books.forEach(book => {
                if (book.id === searchResult.id) searchResult.shelf = book.shelf
              })
              return searchResult
            })
      
            // finally, setState
            this.setState({ returnedBooks: adjustedBooks })
      
          })
        }
      }

    updateShelf = (book, shelf) => {
        if (shelf === 'none') {
            this.setState(prevState => ({
                myReads: prevState.myReads.filter(b => b.id !== book.id)
            }))
        }

        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                const { myReads } = this.state
                const myReadsIds = myReads.map(b => b.id)
                let myNewReads = [] //if book already on shelf: reshelf; otherwise, add to myReads

                if (myReadsIds.includes(book.id)) {
                    myNewReads = myReads.map(b => b.id === book.id ? { ...b, shelf } : b)
                } else {
                    book.shelf = shelf
                    myNewReads = [...myReads, book]
                } this.setState({ myReads: myNewReads })
            })
        }
    }



    render() {
        return (
            <div className="app">
                <Route path="/search" exact render={() => (
                    <SearchBook searchQuery={this.searchQuery} searchedBooks={this.state.searchedBooks} updateShelf={this.updateShelf} books={this.state.myReads} />
                )} />
                <Route path="/" exact render={() => (
                    <HomePage updateShelf={this.updateShelf} books={this.state.myReads} />
                )} />

            </div>
        )
    }
}

export default App