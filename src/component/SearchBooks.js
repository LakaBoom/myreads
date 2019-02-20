import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import OneBook from './OneBook'

class SearchBooks extends Component{
  state = {
    query:'',
    showingBooks:[],
    notFound: false
  }

  updateQuery= (event)=>{
    const query = event.target.value

    this.setState({query})

    if(query){
      BooksAPI.search(query.trim()).then(res =>{
        if(res.length > 0){
          this.setState({showingBooks:res, notFound:false})
        }else{
          this.setState({showingBooks:[], notFound: true})
        }
      })
    }else{ // if query is empy, clear the results
      this.setState({showingBooks:[], notFound: false})
    }
  }

  clearQuery = () =>{
    this.setState({query:'', notFound:false})
  }


  render(){
    const {showingBooks,notFound} = this.state
    const {updateShelf, books} = this.props

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange = {this.updateQuery}/>
          </div>
        </div>
        <div className="search-books-results">
          {(notFound)&& (
            <div className='no-result'>
              Not found related books
              <button className='clear-no-result-button' onClick = {this.clearQuery}>clear</button>
            </div>
          )}
          {(!notFound)&& (
            <ol className="books-grid">
              {(showingBooks.length >0) &&(
                showingBooks.map(book=>(
                  <li key= {book.id}>
                    <OneBook
                      updateShelf = {updateShelf}
                      book = {book}
                      books = {books}
                      />
                  </li>
                )))
              }
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBooks
