import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './app.css';
import { AppRoutes } from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import '@smastrom/react-rating/style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<AppRoutes />
		</Provider>
	</React.StrictMode>
);
