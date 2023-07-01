import { Grid, useTheme } from '@mui/material';

// project imports
import CustomTypography from './CustomTypography';

const NavMenu = ({ options, textField, relativePath = true, vertical, sx = {} }) => {
	const theme = useTheme();
	return (
		<Grid
			container
			spacing={theme.spacing()}
			sx={{ ...sx, flexDirection: vertical ? 'column' : 'row' }}
		>
			{options.map((option) => {
				return (
					<Grid key={option[textField]} sx={{ whiteSpace: 'nowrap', margin: '0 0.5rem' }}>
						<CustomTypography
							textContent={option[textField]}
							to={option.url}
							tooltipText={option.tooltipText || option[textField]}
							relativePath={relativePath}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default NavMenu;
