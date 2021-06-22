import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'f98593a095b44546bf4073744b540da0';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
export default class SearchableMovieReviewsContainer extends Component {
    constructor() {
        super()
        this.state = {
            reviews: [],
            searchTerm: ''
        }
    }

    handleSearchInputChange = e => this.setState({ searchTerm: e.target.value })
    
    handleSubmit = e => e.preventDefault()

    componentDidMount() {
        fetch(URL).then(r => r.json()).then(resp => this.setState({reviews: resp.result}))
    }

    render() {
        return (
          <div className="searchable-movie-reviews">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="search-input">Search Movie Reviews</label>
              <input
                id="search-input"
                type="text"
                style={{ width: 300 }}
                onChange={this.handleSearchInputChange}
              />
              <button type="submit">Submit</button>
            </form>
            {typeof this.state.reviews === 'object' &&
              this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
            <MovieReviews reviews={this.state.reviews} />
          </div>
        );
      }
    }
