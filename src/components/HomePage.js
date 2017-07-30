import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'
 
class HomePage extends Component {
    state = {
        books: [],
    }

    //added array of books to the state
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }
render() {
    console.log(this.state.books);
return <div className="list-books">
    <div className="list-books-title">
        <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
        <BookShelf shelf="Currently Reading" books={ this.state.books.filter(book => book.shelf === 'currentlyReading')} />,
        <BookShelf shelf="Want to Read" books={this.state.books.filter(book => book.shelf === 'wantToRead')} />,
        <BookShelf shelf="Read" books={this.state.books.filter(book => book.shelf === 'read')} />
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
