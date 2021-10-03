import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import "./pages";
import "./components";
import NavBar from "./components/NavBar/NavBar";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <NavBar />
      <Login />
      <Footer />
    </Router>
  );
}

export default App;
