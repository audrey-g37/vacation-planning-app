import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';

// project imports
import { AuthProvider } from 'contexts/auth/Auth';
import Routes from 'routes';
import NavScroll from 'views/components/re-usable/NavScroll';
import theme from 'style/theme';
import './App.css';

const httpLink = createHttpLink({
	uri: '/graphql'
});

// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
	uri: httpLink,
	cache: new InMemoryCache()
});

function App() {
	const mode = 'light';

	return (
		<ApolloProvider client={client}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme(mode)}>
					<CssBaseline />
					<AuthProvider>
						<NavScroll>
							<Routes />
						</NavScroll>
					</AuthProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</ApolloProvider>
	);
}
export default App;
