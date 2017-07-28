import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SearchBook from './components/search'
import './App.css'

class App extends React.Component {

  render() {
  //console out books can't figure out how to get props inside

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
