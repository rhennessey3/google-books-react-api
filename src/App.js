import React, { Component } from "react";
import './App.css';
// import Header from './Header'
// import Books from './Books'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { query: '' }
    this.handlequery = this.handlequery.bind(this)
  }

  handlequery(event) {
    this.setState({ query: event.target.value })
  }


  // https://cors-anywhere.herokuapp.com/
  // This is where we can do our api call - 
  handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&key=AIzaSyDSmvyCyGRyNFq0hkSaU1MeqHnmDQ867-I`
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
                value={this.state.query}
                onChange={this.handlequery}
              />

              <button>Search</button>
            </form>
          </div>

          <div className="filterSearch">
            <div className="filterPrintType">
              <p>Print Type:</p>
              <select value={this.state.bookType} onChange={this.handleChange}>
                <option name="All">All</option>
                <option name="Print"> Print</option>
                <option name="E-Book">E-Book</option>
              </select>
            </div>
            <div className="filterBookType">
              <p>Book Type:</p>
              <select value={this.state.bookType} onChange={this.handleChange}>
                <option name="All">All</option>
                <option name="Free"> Free</option>
              </select>
            </div>
          </div>

          <div className="bookOutputComponent">
            <div className="bookTitle">
              <h2>Henry 1</h2>
            </div>
            <div className="bookInfoWrapper">
              <div className="bookImg">

              </div>
              <div className="bookInfo">
                <p> author : C.Warren Hollister </p>
                <p> Price </p>
                <p> Description </p>
              </div>
            </div>
          </div>

        </main>
      </div>
    )
  }
}



export default App;
