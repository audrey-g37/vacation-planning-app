// project imports
import Header from 'views/components/specific/Header';
import Footer from 'views/components/specific/Footer';
import AuthLayout from 'views/pages/auth/AuthLayout';

import { UnderConstruction } from 'views/pages/index';

const AuthMain = () => {
	// *using to disable app/features while I refactor and enhance app
	const underConstruction = process.env.NODE_ENV === 'production';
	const lastModifiedDate = '06/30/2023';
	return (
		<>
			<Header underConstruction={underConstruction} />
			{underConstruction ? (
				<UnderConstruction lastModifiedDate={lastModifiedDate} />
			) : (
				<AuthLayout />
			)}
			<Footer />
		</>
	);
};

export default AuthMain;
