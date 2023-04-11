import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from '@mui/material';

// project imports
import theme from 'style/theme';
import { Footer, MainNav } from 'views/components/display';
import {
	Signup,
	Login,
	Dashboard,
	UnderConstruction,
	ViewSingleTrip,
	ViewAllTrips,
	ViewTask,
	ViewBudget,
	EditTask,
	EditBudget
} from 'views/pages';

const httpLink = createHttpLink({
	uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

// *using to disable app/features while I refactor and enhance app
const underConstruction = true;

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<Router>
						<MainNav underConstruction={underConstruction} />
						{underConstruction ? (
							<UnderConstruction />
						) : (
							<>
								<Route exact path='/'>
									<Login />
								</Route>
								<Route exact path='/signup'>
									<Signup />
								</Route>
								<Switch>
									<Route exact path='/dashboard'>
										<Dashboard />
									</Route>
									<Route exact path='/view-trip/:id'>
										<ViewSingleTrip />
									</Route>
									<Route exact path='/view-trips/'>
										<ViewAllTrips />
									</Route>
									<Route exact path='/:id/view-tasks'>
										<ViewTask />
									</Route>
									<Route exact path='/:id/view-tasks/:id'>
										<EditTask />
									</Route>
									<Route exact path='/:id/view-budget'>
										<ViewBudget />
									</Route>
									<Route exact path='/:id/view-budgets/:id'>
										<EditBudget />
									</Route>
								</Switch>
							</>
						)}
						<Footer />
					</Router>
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
}

export default App;
