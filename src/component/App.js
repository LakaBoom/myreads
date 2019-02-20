import React from 'react'
import '../css/App.css'
import 'react-notifications/lib/notifications.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications'

class App extends React.Component {

  state = {
    currentlyReading:[],
    wantToRead:[],
    read:[]
  }

  componentWillMount(){
    this.updateState()
  }

  updateState=()=>{
    BooksAPI.getAll().then(books =>{
      this.setState({
      currentlyReading:books.filter(book=> book.shelf ==='currentlyReading'),
      wantToRead: books.filter(book=> book.shelf ==='wantToRead'),
      read:books.filter(book=> book.shelf ==='read')
      })
    })
  }

  updateShelf =(book,shelf)=>{
    var prevShelf

    const {currentlyReading, wantToRead, read} = this.state
    var books = currentlyReading.concat(wantToRead, read)

    // change shelf in main page
    if(book.shelf){
      prevShelf = book.shelf
    }else{
    // change a book'shelf which has already existed in shelf
    // in seach page
      books.forEach(b=>{
        if(b.id === book.id){
          prevShelf = b.shelf
          return
        }
      })
    }
    book.shelf = shelf
    BooksAPI.update(book,shelf).then(()=>{
      if(prevShelf){
        this.setState(prevState=>({
          [prevShelf]:(prevState[prevShelf])&&(prevState[prevShelf].length > 0)&&prevState[prevShelf].filter(b=> b.id !== book.id),
        }))
      }
      if(shelf !=='none'){
        this.setState(prevState =>({
          [shelf]: prevState[shelf].concat(book)
        }))
      }

      // configure notification message
      var changeShelfName = {
        'currentlyReading' : 'Currently Reading',
        'wantToRead' : 'Want To Read',
        'read': 'Read',
        'undefined': 'Repository',
        'none': 'Repository'
      }
      if(changeShelfName[shelf] === 'Repository'){
        NotificationManager.warning(`Deleted ${book.title} from ${changeShelfName[prevShelf]}`,'Deleted')
      }else if(changeShelfName[prevShelf] === 'Repository'){
        NotificationManager.success(`Added ${book.title} to ${changeShelfName[shelf]}`,'Added')
      }else{
        NotificationManager.info(`Moved ${book.title} from ${changeShelfName[prevShelf]} to ${changeShelfName[shelf]}`,'Shelf Change')
      }
    })
  }


  render() {
    return (
      <Router>
        <div className="app">
          <NotificationContainer/>

          <Route exact path ='/' render = {()=>(
              <ListBooks
                books = {this.state}
                updateShelf = {this.updateShelf}/>
            )}
          />

          <Route path = '/search' render = {()=>(
                <SearchBooks
                  books = {this.state}
                  updateShelf ={this.updateShelf}/>
            )}
          />

        </div>

      </Router>
    )
  }
}

export default App
