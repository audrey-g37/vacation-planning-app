// mui imports
import { Grid } from '@mui/material';

// project imports
import MainNav from 'views/components/display/MainNav';
import Footer from 'views/components/display/Footer';
import AuthLayout from 'views/pages/auth/AuthLayout';

import { UnderConstruction } from 'views/pages';

const AuthMain = ({ underConstruction, lastModifiedDate }) => {
	return (
		<Grid
			container
			sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}
		>
			<Grid item xs={12}>
				<MainNav />
			</Grid>
			<Grid item xs={12}>
				{underConstruction ? (
					<UnderConstruction lastModifiedDate={lastModifiedDate} />
				) : (
					<AuthLayout />
				)}
			</Grid>
			<Grid item xs={12}>
				<Footer />
			</Grid>
		</Grid>
	);
};

export default AuthMain;
