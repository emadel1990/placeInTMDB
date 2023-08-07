import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const LayoutContainer = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
