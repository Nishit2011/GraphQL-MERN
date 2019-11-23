import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";
import { getQueryDefinition } from "apollo-utilities";

class BookDetails extends Component {
  displayBookDetails = () => {
    console.log(this.props);
    return (
      <div style={{ backgroundColor: "#ccc", border: "1px solid black" }}>
        <h3>Name: {this.props.data.book.author.name}</h3>
        <h3>Genre: {this.props.data.book.genre}</h3>
        <h3>Other Books by the same author:</h3>
        <ul>
          {this.props.data.book.author.books.map((currentVal, index) => (
            <li key={index}>{currentVal.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <div id='book-details'>
        {this.props.data.book ? (
          this.displayBookDetails()
        ) : (
          <div>No Book Selected</div>
        )}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
