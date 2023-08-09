import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { lazy } from '@loadable/component';
import { SWRConfig } from 'swr';
import { AppRoutesConstants } from '../config/routes';
import PublicRouteContainer from './PublicRouteContainer';
import localStorageProvider from '../services/SWRLocalCache';
import LayoutContainer from '../components/layout/LayoutContainer';
import { Spinner } from '../components/generics/Spinner';

const LoadableApp = lazy(() => import('../App'));

const LoadableMoviePage = lazy(() => import('../pages/MoviePage'));

const LoadableNotFound = lazy(() => import('../pages/NotFound'));

const LoadableMyList = lazy(() => import('../pages/MyList'));

export const AppRoutes = () => {
	return (
		<Router>
			<SWRConfig value={{ provider: localStorageProvider }}>
				<Routes>
					<Route element={<LayoutContainer />}>
						<Route
							path="/*"
							element={<Navigate to={AppRoutesConstants.NOT_FOUND} />}
						/>
						<Route element={<PublicRouteContainer />}>
							<Route
								path={AppRoutesConstants.HOME}
								index
								element={
									<Suspense fallback={<Spinner />}>
										<LoadableApp />
									</Suspense>
								}
							/>
							<Route
								path={AppRoutesConstants.MY_LIST}
								index
								element={
									<Suspense fallback={<Spinner />}>
										<LoadableMyList />
									</Suspense>
								}
							/>
							<Route
								path={AppRoutesConstants.NOT_FOUND}
								element={
									<Suspense fallback={<Spinner />}>
										<LoadableNotFound />
									</Suspense>
								}
							/>
							<Route
								path={AppRoutesConstants.MOVIE}
								element={
									<Suspense fallback={<Spinner />}>
										<LoadableMoviePage />
									</Suspense>
								}
							/>
						</Route>
					</Route>
				</Routes>
			</SWRConfig>
		</Router>
	);
};
