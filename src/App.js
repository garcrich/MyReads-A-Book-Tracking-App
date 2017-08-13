import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SearchBook from './components/search'
import * as BooksAPI from './BooksAPI'
import './css/App.css'

class App extends React.Component {
  state = {
      books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  render() {

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBook />
        )} />

        <Route path="/" exact render={() => (
          <HomePage />
        )} />

      </div>
    )
  }
}

export default App
