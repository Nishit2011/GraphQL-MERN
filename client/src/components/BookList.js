import React, { Component } from "react";
import { getBooksQuery } from "../queries/queries";

//similar to connectfunction from react-redux
import { graphql } from "react-apollo";
import BookDetails from "./BookDetails";

class BookList extends Component {
  state = {
    bookId: null
  };
  renderBookList = e =>
    this.props.data.books.map((currentVal, index) => (
      <li key={index} onClick={() => this.setState({ bookId: currentVal.id })}>
        {currentVal.name}
      </li>
    ));

  render() {
    //if (this.props.data.loading) return false;

    return (
      <div>
        <ul id='book-list'>
          {!this.props.data.loading ? (
            this.renderBookList()
          ) : (
            <div>
              <h3>Loading...</h3>
            </div>
          )}
        </ul>
        <BookDetails bookId={this.state.bookId} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
