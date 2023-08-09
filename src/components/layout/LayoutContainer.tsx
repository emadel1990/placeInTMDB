import { Header } from './Header';
import { Outlet } from 'react-router-dom';

const LayoutContainer = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default LayoutContainer;
