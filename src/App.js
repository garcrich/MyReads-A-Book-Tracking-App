import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SearchBook from './components/search'
import './css/App.css'
import * as BooksAPI from './BooksAPI'
class App extends React.Component {
    state = {
        myReads: []
    }
    
    //added array of books to the state
    componentWillMount() {
        BooksAPI.getAll().then(myReads => {
            this.setState({ myReads })
        })
    }
    
updateShelf = (book, shelf) => {
    if (shelf === 'none') {
        this.setState(prevState => ({
            myReads: prevState.myReads.filter(b => b.id !== book.id)
        }))
    }
    
    if (book.shelf !== shelf) {
        BooksAPI.update(book, shelf).then(() => {
            const { myReads } = this.state
            const myReadsIds = myReads.map(b => b.id)
            let myNewReads = [] //if book already on shelf: reshelf; otherwise, add to myReads
            if (myReadsIds.includes(book.id)) {
                myNewReads = myReads.map(b => b.id === book.id ? { ...b, shelf } : b)
            } else {
                book.shelf = shelf
                myNewReads = [...myReads, book]
            } this.setState({ myReads: myNewReads })
        })
    }
}



  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={() => (
          <SearchBook updateShelf={this.updateShelf} books={this.state.myReads}/>
        )} />
        <Route path="/" exact render={() => (
          <HomePage updateShelf={this.updateShelf} books={this.state.myReads}/>
        )} /> 

      </div>
    )
  }
}

export default App