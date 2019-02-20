import React, { Component } from 'react'
//import { CSSTransition } from 'react-transition-group'

class ShelfChange extends Component{

  state = {
    showMessage:false
  }

  handleChange = event=>{
    this.setState({showMessage:true})
    var book = this.props.bookObj
    var shelf = event.target.value
    this.props.updateShelf(book,shelf)
  }


  render(){
    var { bookObj,books } =this.props
    books = books.currentlyReading.concat(books.wantToRead,books.read)

    var defaultValue = 'none'
    books.forEach(book =>{
      if(book.id === bookObj.id){
         defaultValue = book.shelf
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
