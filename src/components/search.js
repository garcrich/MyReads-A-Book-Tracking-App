import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'javascript-debounce'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class SearchBook extends Component {
    state = { books: [] }

    returnedResults = () =>
    {setTimeout(() => {
        this.searchQuery();
    }, 1000);}
    
    searchQuery = (event) => {
        if (event.target.value !== '') {
        setTimeout(
            BooksAPI.search(event.target.value,5).then(
                books => {
                    this.setState({ books })
                    console.log(this.state.books);
                }).catch(this.setState({
                    books: undefined
                }))
        )
        } else {
            this.setState({
                books: undefined
            })
        }
    }


    updateShelf = (book, shelf) => {
        console.log(book, shelf)
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



    render() {

        return <div className="search-books">
            <div className="search-books-bar">


                <Link
                    className="close-search"
                    to="/">
                    Close
                </Link>


                <div className="search-books-input-wrapper">
                    <input
                    type="text"
                    value={this.state.searchedBooks} 
                    onChange={this.returnedResults}
                    placeholder="Search by title or author"
                    />

                </div>
            </div>
            <div className="search-books-results">

                 {this.state.books !== undefined && (
                 <BookShelf shelf="Search Results" updateShelf={this.updateShelf} books={this.state.books}/>
                 )}  
            </div>
        </div>
    };
};

export default SearchBook;