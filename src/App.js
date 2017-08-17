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
    componentDidMount() {
        BooksAPI.getAll().then(myReads => {
            this.setState({ myReads })
        })
    }
    emptybooks = () => this.setState({ searchedBooks : []})

    searchQuery = (event) => {
        const query = event.target.value
        if (query !== '') { 
          BooksAPI.search(query).then(searchResults => {
            if (!searchResults || searchResults.error) {
              this.setState({ searchedBooks: [] })
              return
            }
            // sync books by mapping over searchResults, and
            // iterating over this.props.books      
            const adjustedBooks = searchResults.map(searchResult => {
                this.state.myReads.forEach(book => {
                if (book.id === searchResult.id) searchResult.shelf = book.shelf
              })
              return searchResult
            })
      
            // finally, setState
            this.setState({ searchedBooks: adjustedBooks })
      
          })
        } else {
            this.setState({ searchedBooks: [] })
        }
      }

    updateShelf = (book, shelf) => {
        
        if (shelf === 'none') {
            this.setState(prevState => ({
                myReads: prevState.myReads.filter(b => b.id !== book.id),
            }))
        }

        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                const { myReads, searchedBooks } = this.state
                const myReadsIds = myReads.map(b => b.id)
                const searchedBooksIds = myReads.map(b => b.id)
                let myNewReads = [] //if book already on shelf: reshelf; otherwise, add to myReads
                let newSearchedBooks = []

                if (myReadsIds.includes(book.id) || searchedBooksIds.includes(book.id)) {
                    myNewReads = myReads.map(b => b.id === book.id ? { ...b, shelf } : b)
                    newSearchedBooks = searchedBooks.map(b => b.id === book.id ? { ...b, shelf } : b)

                } else {
                    book.shelf = shelf
                    myNewReads = [...myReads, book]
                    newSearchedBooks = [...searchedBooks, book]
                }
                this.setState({ myReads: myNewReads, searchedBooks: newSearchedBooks })

            })
        }
    }



    render() {
        return (
            <div className="app">
                <Route path="/search" exact render={() => (
                    <SearchBook emptybooks={this.emptybooks} searchQuery={this.searchQuery} updateShelf={this.updateShelf} books={this.state.searchedBooks} />
                )} />
                <Route path="/" exact render={() => (
                    <HomePage updateShelf={this.updateShelf} books={this.state.myReads} />
                )} />

            </div>
        )
    }
}

export default App