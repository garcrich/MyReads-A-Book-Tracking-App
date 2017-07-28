import React, { Component } from 'react'
class BookShelf extends Component {
    render() {
        return <div className="bookshelf">
            <h2>{this.props.shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map((book) => 
                        <li key={book.title}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>

                                    <div className="book-shelf-changer">
                                        <select>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>

                                </div>
                                <div style={{color: "red", fontWeight: "bold", marginTop: "20px" }}><em>{book.shelf}</em></div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        </li>
                    )}
                </ol>
            </div>
        </div>
    }
}

export default BookShelf;