import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { AppRoutesConstants } from '../config/routes';
import PublicRouteContainer from './PublicRouteContainer';
import { App } from '../App';
import localStorageProvider from '../services/SWRLocalCache';
import { NotFound } from '../pages/NotFound';

export const AppRoutes = () => {
	return (
		<Router>
			<SWRConfig value={{ provider: localStorageProvider }}>
				<Routes>
					<Route
						path="/*"
						element={<Navigate to={AppRoutesConstants.NOT_FOUND} />}
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
						<Route
							path={AppRoutesConstants.NOT_FOUND}
							element={<NotFound />}
						/>
					</Route>
				</Routes>
			</SWRConfig>
		</Router>
	);
};
