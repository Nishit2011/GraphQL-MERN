const express = require("express");
const graphQLHttp = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cross-origin requests
app.use(cors());

//connect to database
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-fke3b.mongodb.net/ninja-gql?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphQLHttp({
    schema,
    graphiql: true
  })
);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(3100, () => {
  console.log(`Listenings on port 3100`);
});
