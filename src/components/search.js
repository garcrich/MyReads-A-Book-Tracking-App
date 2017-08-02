import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {
    state = { searchedBooks : '' }

    searchQuery = (event) => {
        this.setState({searchedBooks: event.target.value})
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
                    <input type="text" value={this.state.searchedBooks} onChange={this.searchQuery} placeholder="Search by title or author" />
                    {this.state.searchedBooks}

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    <li>

                    </li>
                </ol>
            </div>
        </div>
    };
};

export default SearchBook;