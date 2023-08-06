import { Outlet } from 'react-router-dom';

const PublicRouteContainer = () => {
	/* LOGIC HERE */
	/* return !token ? <Outlet /> : <Navigate to={RoutesConstants.PRIVATE_ROUTE} />; */
	return <Outlet />;
};

export default PublicRouteContainer;
