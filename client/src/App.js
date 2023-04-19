import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { ThemeProvider } from '@mui/material';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// project imports
import Routes from 'routes';
import NavScroll from 'views/components/re-usable/NavScroll';
import theme from 'style/theme';
import './App.css';

const httpLink = createHttpLink({
	uri: '/graphql'
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: httpLink,
	cache: new InMemoryCache()
});

function App() {
	const mode = 'light';

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme(mode)}>
				<CssBaseline />
				<ApolloProvider client={client}>
					<NavScroll>
						<Routes />
					</NavScroll>
				</ApolloProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
