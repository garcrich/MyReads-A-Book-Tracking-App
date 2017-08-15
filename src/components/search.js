import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class SearchBook extends Component {
    state = { 
        searchedBooks: [],
        returnedBooks: [],
        matchingBooks: []
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
                    //const returnedShelf = returnedBooks.map(shelvedBook =>  shelvedBook.id)
                    returnedBooks.map(shelvedBook => this.props.books.map(currentBook => {
                        if(shelvedBook.id === currentBook.id){
                            shelvedBook.shelf = currentBook.shelf
                        }
                        return this.setState({matchingBooks: shelvedBook})
                        
                    }))
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

                 <BookShelf updateShelf={this.props.updateShelf} shelf="Search Results" matchingBooks={this.state.matchingBooks.id} matchingShelf={this.state.matchingBooks.shelf} books={this.state.returnedBooks}/>

            </div>
        </div>
    };
};

export default SearchBook;