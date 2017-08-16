import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class SearchBook extends Component {
    state = { 
        searchedBooks: [],
        returnedBooks: []
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
    
    
    render() {
        //console.log(this.state.returnedBooks)
        return <div className="search-books">
            <div className="search-books-bar">

                <Link
                    className="close-search"
                    to="/">
                    Close
                </Link>


                <div className="search-books-input-wrapper">
                    <DebounceInput
                    debounceTimeout={325}
                    element="input"
                    type="text"
                    value={this.state.searchedBooks.string} 
                    onChange={this.searchQuery}
                    placeholder="Search by title or author"
                    />

                </div>
            </div>
            <div className="search-books-results">

                 <BookShelf updateShelf={this.props.updateShelf} shelf="Search Results" books={this.state.returnedBooks}/>

            </div>
        </div>
    };
};

export default SearchBook;