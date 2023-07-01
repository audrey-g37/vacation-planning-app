import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';

// project imports
import { AuthProvider } from 'contexts/auth/Auth.js';
import Routes from 'routes';
import NavScroll from 'views/components/re-usable/NavScroll.js';
import theme from 'style/theme.js';
import './App.css';

const httpLink = createHttpLink({
	uri: `${window.location.origin}/graphql`
});

// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
	uri: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3001/graphql' : httpLink}`,
	cache: new InMemoryCache(),
	name: 'GRIP',
	version: '1.0.0'
});

function App() {
	const mode = 'dark';
	const styledBackground = {
		backgroundImage: `url(${
			process.env.PUBLIC_URL +
			`/images/hawaii-beach-${mode === 'dark' ? 'black-and-white' : 'rainbow'}.jpeg`
		})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
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
