import React, { Component } from 'react'
import noCover from '../img/no-cover-img.png'
import ShelfChange from './ShelfChange'

class OneBook extends Component{
  render(){
    const{updateShelf, book, books} = this.props

    return(
      <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail)? book.imageLinks.smallThumbnail:noCover})`}}></div>
              <ShelfChange
                updateShelf = {updateShelf}
                book = {book}
                books = {books}
                />
        </div>
        <div className="book-title">{book.title? book.title : 'No title available'}</div>
        <div className="book-authors">{book.authors? book.authors[0]:'No author available'}</div>
      </div>
    )
  }

}
export default OneBook
