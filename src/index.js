import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
//import BookShelf from './BookShelf'
import './css/index.css'

/* <BrowserRouter><App /></BrowserRouter> */
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
