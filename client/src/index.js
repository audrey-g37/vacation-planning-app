import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function

reportWebVitals();
