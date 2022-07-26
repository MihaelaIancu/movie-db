import React from "react";
import "./App.css";
import "./media.css";
import MovieList from "./components/MovieList";
import FavouriteList from "./components/FavouriteList";
import LoadingSpinner from "./components/LoadingSpinner";
import Search from "./components/Search";
import Pagination from "./components/Pagination";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      popular: [],
      favMovies: [],
      stareButon: null,
      message: null,
      isLoading: null,
      search: "",
      totalResults: 0,
      currentPage: 1,
    };

    this.apiKey = process.env.REACT_APP_API;

    this.addItem = this.addItem.bind(this);
    this.addItemFromPopular = this.addItemFromPopular.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=56e1ea8d0afb446ae93eade7c586f902"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ popular: data.results });
        this.setState({ isLoading: false });
        // Optional code to simulate delay
        // setTimeout(() => {
        //   this.setState({ movies: data.results });
        //   this.setState({ isLoading: false });
        // }, 3000);
        // console.log({ movies: data.results });
      })
      .catch(() => {
        this.setState({ isLoading: true });
        this.setState({ message: "Unable to fetch movies list" });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.search}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movies: [...data.results],
          totalResults: data.total_results,
          stareButon: null,
        });
        this.setState({ isLoading: false });
        console.log(data);
      })
      .catch(() => {
        this.setState({ isLoading: true });
        this.setState({ message: "Unable to fetch movies list" });
      });
  }

  changeInfo(event) {
    console.log(`${this.state.stareButon}`);
    console.log(`${this.state.favMovies}`);
    this.setState({ stareButon: event.target.value });
    // this.setState({ message: event.target.value });
  }

  addItem(index) {
    const fav = this.state.movies.find((movie) => movie.id === index);
    this.setState({ favMovies: [...new Set([...this.state.favMovies, fav])] });
  }

  addItemFromPopular(index) {
    const fav = this.state.popular.find((movie) => movie.id === index);
    this.setState({ favMovies: [...new Set([...this.state.favMovies, fav])] });
  }

  deleteItem(index) {
    const deleteFav = this.state.favMovies.filter(
      (movie) => movie.id !== index
    );
    this.setState({ favMovies: deleteFav });
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  handleReset(event) {
    // this.setState({ search: "" });
    // console.log("reset", this.state.search);
    document.querySelector("#outlined-basic").value = "";
  }

  nextPage(pageNumber) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.search}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: [...data.results], currentPage: pageNumber });
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: true });
        this.setState({ message: "Unable to fetch movies list" });
      });
  }

  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);
    // console.log(numberPages);
    return (
      <div className="app">
        <Search
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <div className="categories">
          <button value="popular" onClick={(event) => this.changeInfo(event)}>
            Popular
          </button>
          <button
            value="favourites"
            onClick={(event) => this.changeInfo(event)}
          >
            Favourites
          </button>
        </div>
        {this.state.isLoading === true ? (
          <LoadingSpinner />
        ) : (
          <>
            {this.state.stareButon === "popular" ? (
              <div className="main">
                <MovieList
                  movies={this.state.popular}
                  addItem={this.addItemFromPopular}
                />
              </div>
            ) : this.state.stareButon === "favourites" ? (
              <div className="main">
                <FavouriteList
                  favMovies={this.state.favMovies}
                  deleteItem={this.deleteItem}
                />
              </div>
            ) : (
              <div className="main">
                <MovieList movies={this.state.movies} addItem={this.addItem} />
              </div>
            )}
          </>
        )}
        {this.state.message && (
          <div className="main error">{this.state.message}</div>
        )}
        {this.state.totalResults > 20 && this.state.stareButon === null ? (
          <Pagination
            pages={numberPages}
            nextPage={this.nextPage}
            currentPage={this.state.currentPage}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
