import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { AppRoutesConstants } from '../config/routes';
import PublicRouteContainer from './PublicRouteContainer';
import { App } from '../App';
import localStorageProvider from '../services/SWRLocalCache';

export const AppRoutes = () => {
	return (
		<Router>
			<SWRConfig value={{ provider: localStorageProvider }}>
				<Routes>
					<Route
						path="/*"
						element={<Navigate to={AppRoutesConstants.HOME} />}
					/>
					<Route element={<PublicRouteContainer />}>
						<Route
							path={AppRoutesConstants.HOME}
							index
							element={<App />}
						/>
						{/* <Route
						path={AppRoutesConstants.MY_LIST}
						index
						element={<MyList />}
					/> */}
					</Route>
				</Routes>
			</SWRConfig>
		</Router>
	);
};
