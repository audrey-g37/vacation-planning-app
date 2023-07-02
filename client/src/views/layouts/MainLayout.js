import { Outlet } from 'react-router-dom';

// project imports
import Header from 'views/components/specific/Header';
import Footer from 'views/components/specific/Footer';

const MainLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default MainLayout;
