import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from '@mui/material';

// project imports
import theme from 'style/theme';
import { Footer, MainNav } from 'views/components/display';
import { UnderConstruction } from 'views/pages';
import Routes from 'routes';
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
const underConstruction = false;

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<Router>
						<MainNav underConstruction={underConstruction} />
						{underConstruction ? <UnderConstruction /> : <Routes />}
						<Footer />
					</Router>
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
}

export default App;
