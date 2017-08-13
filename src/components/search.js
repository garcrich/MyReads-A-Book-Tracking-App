import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class SearchBook extends Component {
    state = { searchedBooks: [] }

    searchQuery = (event) => {
        if (event.target.value !== '') {
            BooksAPI.search(event.target.value).then(
                returnedBooks => {
                    this.setState({ returnedBooks })
    
                }).catch(this.setState({
                    returnedBooks: undefined
                }))
        } else {
            this.setState({
                returnedBooks: undefined
            })
        }
    }
    
    
    
    render() {

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

                 {this.state.returnedBooks !== undefined && (
                 <BookShelf updateShelf={this.props.updateShelf} shelf="Search Results" books={this.state.returnedBooks}/>
                 )}  
            </div>
        </div>
    };
};

export default SearchBook;