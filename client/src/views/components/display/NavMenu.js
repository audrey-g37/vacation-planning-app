import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

const NavMenu = ({ navOptions, textField, relativePath, vertical, color }) => {
	return (
		<Grid container sx={{ flexDirection: vertical ? 'column' : 'row' }}>
			{navOptions.map((option) => {
				return (
					<Grid item sx={{ whiteSpace: 'nowrap', margin: '0 0.5rem' }}>
						{relativePath ? (
							<Link to={option.url} sx={{ color: color }}>
								{option[textField]}
							</Link>
						) : (
							<a href={option.url} target={'_blank'} style={{ color: color }}>
								{option[textField]}
							</a>
						)}
					</Grid>
				);
			})}
		</Grid>
	);
};

export default NavMenu;
