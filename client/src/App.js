import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';

// project imports
import { AuthProvider } from 'contexts/auth/Auth';
import Routes from 'routes';
import NavScroll from 'views/components/NavScroll';
import theme from 'style/theme';
import './App.css';

const httpLink = `${window.location.origin}/graphql`;

// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
	uri: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3001/graphql' : httpLink}`,
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			// re-querying the cache and server with every query to load most up to date data
			fetchPolicy: 'cache-and-network'
		}
	},
	name: 'GRIP',
	version: '1.0.0'
});

function App() {
	const isDarkMode = window.matchMedia('prefers-color-scheme: dark').matches;
	const mode = isDarkMode ? 'dark' : 'light';

	const styledBackground = {
		// backgroundImage: `url(${
		// 	process.env.PUBLIC_URL +
		// 	`/images/hawaii-beach-${mode === 'dark' ? 'black-and-white' : 'rainbow'}.jpeg`
		// })`,
		backgroundColor: '#BDADAC',
		// backgroundPosition: 'center',
		// backgroundRepeat: 'no-repeat',
		// backgroundSize: 'cover',
		minHeight: '100vh'
	};

	return (
		<div style={styledBackground}>
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
		</div>
	);
}
export default App;
