import React, { Component } from "react";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  state = {
    bookName: "",
    genre: "",
    authorId: ""
  };
  getAllAuthors = () =>
    this.props.getAuthorsQuery.authors.map((currentVal, index) => (
      <option key={currentVal.id} value={currentVal.id}>
        {currentVal.name}
      </option>
    ));

  addBook = e => {
    e.preventDefault();

    //this.setState({ authorId: this.props.authors.id });
    this.props.addBookMutation({
      variables: {
        name: this.state.bookName,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      //re-running the book list query so that the book list is updated
      //as soon as a book is added
      refetchQueries: [{ query: getBooksQuery }]
    });
    console.log(this.state);
  };

  render() {
    return (
      <form id='add-book' onSubmit={e => this.addBook(e)}>
        <div className='field'>
          <label>Book Name</label>
          <input
            type='text'
            onChange={e => this.setState({ bookName: e.target.value })}
          />
        </div>

        <div className='field'>
          <label>Genre</label>
          <input
            type='text'
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>

        <div className='field'>
          <label>Author</label>
          <select
            onChange={e =>
              this.setState({
                authorId: e.target.value
              })
            }
          >
            <option value='Select Author'>Select Author</option>
            {!this.props.getAuthorsQuery.loading ? (
              this.getAllAuthors()
            ) : (
              <option>Loading....</option>
            )}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
