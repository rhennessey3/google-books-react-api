import React, { Component } from "react";
import './App.css';
// import Header from './Header'
// import Books from './Books'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { query: '', filterType: '', printType: '', books: [] }
    // this.handlequery = this.handlequery.bind(this)
  }

  handleChange = (event) => {
    console.log(event.target.id, event.target.value)
    this.setState({ [event.target.id]: event.target.value })

  }

  // https://cors-anywhere.herokuapp.com/
  // This is where we can do our api call - 
  handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    let url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&key=AIzaSyDSmvyCyGRyNFq0hkSaU1MeqHnmDQ867-I`
    if (this.state.filterType) {
      url += `&filter=${this.state.filterType}`
    }
    if (this.state.printType) {
      url += `&printType=${this.state.printType}`
    }

    const options = {
      method: 'GET',
    }

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          books: data.items || [],
          title: "",
          author: "",
          listPrice: "",
          description: "",
          imageLinks: "",
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }


  render() {
    return (
      <div className="App">

        <div className="App-header">
          <div className="black-header">
            <h1>Google Books Search</h1>
          </div>
        </div>

        <main>

          <div className="searchInput">
            <form onSubmit={this.handleSubmit}>
              Search:
              <input
                type="text"
                id="query"
                value={this.state.query}
                onChange={this.handleChange}
              />
              <button>Search</button>
            </form>
          </div>

          <div className="filterSearch">
            <div className="filterPrintType">
              <p>Paid or Free:</p>
              <select
                id="filterType"
                value={this.state.salesType}
                onChange={this.handleChange}>
                <option name="ebooks">All</option>
                <option value="free-ebooks"> Free-e-book</option>
                <option value="paid-ebooks">Paid-e-Book</option>
                <option value="partial">Partial</option>
                <option value="full"> Full</option>
              </select>
            </div>
            <div className="filterBookType">
              <p>Print Type:</p>
              <select
                id="printType"
                value={this.state.printType}
                onChange={this.handleChange}>
                <option value="all">All</option>
                <option value="books"> Books</option>
                <option value="magazines"> Magazines</option>
              </select>
            </div>


          </div>
          {
            this.state.books.map(book => (<div className="bookOutputComponent">
              <div className="bookTitle">
                <h2>{book.volumeInfo.title}</h2>
              </div>
              <div className="bookInfoWrapper">
                <div className="bookImg">
                  <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="{book.volumeInfo.title}"></img>
                </div>
                <div className="bookInfo">
                  <p> Author : {book.volumeInfo.authors} </p>
                  <p> Price: {book.saleInfo.listPrice?.amount} </p>
                  <p> Description: {book.volumeInfo.description}</p>
                  <a href={book.volumeInfo.canonicalVolumeLink} target="_new">link text</a>
                </div>
              </div>
            </div>))
          }
          {/* <div className="bookOutputComponent">
            <div className="bookTitle">
              <h2>Henry 1</h2>
            </div>
            <div className="bookInfoWrapper">
              <div className="bookImg">
                <img src="https://picsum.photos/200" alt="Italian Trulli"></img>
              </div>
              <div className="bookInfo">
                <p> author : C.Warren Hollister </p>
                <p> Price </p>
                <p> Description </p>
              </div>
            </div>
          </div> */}

        </main>
      </div>
    )
  }
}



export default App;
