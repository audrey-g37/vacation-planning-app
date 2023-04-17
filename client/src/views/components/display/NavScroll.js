import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const NavScroll = ({ children }) => {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, [pathname]);
	return children || null;
};

NavScroll.propTypes = {
	children: PropTypes.node
};

export default NavScroll;
