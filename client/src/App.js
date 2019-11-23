import React from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import ApolloClient from "apollo-boost";

//similar to Provider in redux library
import { ApolloProvider } from "react-apollo";

//apollo client setup. Similar to store of redux
const client = new ApolloClient({
  uri: "http://localhost:3100/graphql"
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id='main'>
          <h1>Ninja's Reading List</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
