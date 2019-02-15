import React, { Component } from 'react'

class ShelfChange extends Component{
  state = {
    value:this.props.bookObj.shelf
  }

  handleChange = event=>{
    this.setState({value: event.target.value})
    var book = this.props.bookObj
    var shelf = event.target.value
    this.props.onUpdateShelf(book,shelf)
  }

  render(){
    return(
      <div className="book-shelf-changer">
        {JSON.stringify(this.state.value)}
        <select value={this.state.value} onChange = {this.handleChange}>
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
