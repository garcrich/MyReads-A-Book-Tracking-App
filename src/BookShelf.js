import React from 'react'
import ReactDOM from 'react-dom'
import * as BooksAPI from './BooksAPI'

class BookShelf extends React.Component {
    state = {
        books: []
    }

    //added array of books to the state
    componentWillMount() {
        BooksAPI.getAll().then((bookData) => {
            this.setState({ books: bookData })
        })
    }

    render() {
    console.log(this.state.bookData[0].title)



    return <ol>
        {people.map(person=> (
            <li key={person.name}>{person.name}</li>
        ))}
    </ol>
    }
}


export default BookShelf