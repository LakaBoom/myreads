import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import ShelfChange from './ShelfChange'
import {Link} from 'react-router-dom'

class ListBooks extends Component{
  state = {
     currentlyReading:[],
     wantToRead:[],
     read: [],
  }

  updateState=()=>{
    BooksAPI.getAll().then(books =>{
      this.setState({
        currentlyReading:books.filter(book=> book.shelf ==='currentlyReading'),
        wantToRead:books.filter(book=> book.shelf ==='wantToRead'),
        read:books.filter(book=> book.shelf ==='read'),
      })
    })
  }

  componentDidMount(){
    this.updateState()
  }

  updateShelf =(book,shelf)=>{
    BooksAPI.update(book,shelf).then(()=>{
      this.updateState()
      this.forceUpdate()
    })
  }


  render(){
    //object destructuring
    const {currentlyReading, wantToRead, read} = this.state

    const shelves= [
      {name:'Currently Reading',
       booksInside: currentlyReading},
      {name:'Want to Read',
      booksInside: wantToRead},
      {name:'Read',
      booksInside: read}
    ]

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <div key={shelf.name} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelf.booksInside.map(book=>(
                      <li key= {book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{width:128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                            <ShelfChange
                              onUpdateShelf = {this.updateShelf}
                              bookObj = {book}
                              />
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors[0]}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link to='/search' className="open-search">
          <button> Add a book</button>
        </Link>
      </div>
    )
  }
}

export default ListBooks
