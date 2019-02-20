import React, { Component } from 'react'
import ShelfChange from './ShelfChange'
import {Link} from 'react-router-dom'

class ListBooks extends Component{

  render(){
    //object destructuring
    const {updateShelf,books} = this.props

    const shelves= [
      {name:'Currently Reading',
       booksInside:books.currentlyReading},
      {name:'Want to Read',
      booksInside: books.wantToRead},
      {name:'Read',
      booksInside:books.read}
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
                      <li key= {book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                            <ShelfChange
                              updateShelf= {updateShelf}
                              bookObj = {book}
                              books = {books}
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
