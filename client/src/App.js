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

import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewTrip from "./pages/ViewTrip/ViewTrip";
import ViewTask from "./pages/ViewTask/ViewTask";
import ViewBudget from "./pages/ViewBudget/ViewBudget";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />

        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/trip/:id">
          <ViewTrip />
        </Route>

        <Route exact path="/view-tasks">
          <ViewTask />
        </Route>
        <Route exact path="/view-budget">
          <ViewBudget />
        </Route>

        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
