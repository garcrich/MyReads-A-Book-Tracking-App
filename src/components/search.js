import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class SearchBook extends Component {
    state = { 
        searchedBooks: [],
        currentShelf: this.props.books,
    }

    
    componentWillMount() {
        BooksAPI.getAll()
    }

    searchQuery = (event) => {
        if (event.target.value !== '') {
            BooksAPI.search(event.target.value).then(
                returnedBooks => {
                    this.setState({ returnedBooks })
                    //const currentShelf = this.props.books.map(shelvedBook => shelvedBook.id)
                    const returnedShelf = returnedBooks.map(shelvedBook =>  shelvedBook.id)

                    const shelfMatch = 
                    returnedBooks.map(shelvedBook => this.props.books.map(currentBook => {
                        if(shelvedBook.id === currentBook.id){
                            shelvedBook.shelf = currentBook.shelf 
                        }
                        return shelvedBook
                    }))
                    console.log(returnedShelf)
                    console.log(shelfMatch)
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

                 <BookShelf updateShelf={this.props.updateShelf} shelf="Search Results" searchedBooks={this.state.returnedBooks} books={this.state.returnedBooks}/>

            </div>
        </div>
    };
};

export default SearchBook;