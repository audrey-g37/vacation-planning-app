import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from '@mui/material';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// project imports
import theme from 'style/theme';
import Routes from 'routes';
import './App.css';

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

function App() {
	// *using to disable app/features while I refactor and enhance app
	const underConstruction = process.env.NODE_ENV === 'development' ? false : true;
	const lastModifiedDate = '04/11/2023';
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ApolloProvider client={client}>
					<Routes
						underConstruction={underConstruction}
						lastModifiedDate={lastModifiedDate}
					/>
				</ApolloProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
