import React, { Component } from 'react'

class ShelfChange extends Component{

  handleChange = event=>{
    var book = this.props.book
    var shelf = event.target.value
    this.props.updateShelf(book,shelf)
  }

  render(){
    const { book,books } =this.props
    var allBooks = books.currentlyReading.concat(books.wantToRead,books.read)

    var defaultValue = 'none'
    allBooks.forEach(b =>{
      if(b.id === book.id){
         defaultValue = b.shelf
         return
      }
    })

    return(
      <div className="book-shelf-changer">
        <select value = {defaultValue} onChange = {this.handleChange}>
          <option value="move"  disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }

}

export default ShelfChange
