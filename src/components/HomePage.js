import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'
//import SearchBook from './search'

class HomePage extends Component {
    state = {
        books: [],
    }


    updateShelf = (book, shelf) => {
        //console.log(book, shelf)
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
    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({ books })
            //console.log(books)
        })
    }



    render() {
        return <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf updateShelf={this.updateShelf} shelf="Currently Reading" books={this.state.books.filter(book => book.shelf === 'currentlyReading')} />,
                <BookShelf updateShelf={this.updateShelf} shelf="Want to Read" books={this.state.books.filter(book => book.shelf === 'wantToRead')} />,
                <BookShelf updateShelf={this.updateShelf} shelf="Read" books={this.state.books.filter(book => book.shelf === 'read')} />
            </div>


            <div className="open-search">
                <Link
                    to="/search">
                    Add a book
                </Link>
            </div>
        </div>
    }
}

export default HomePage;