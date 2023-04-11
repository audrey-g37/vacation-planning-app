import { Link } from 'react-router-dom';
import { Grid, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NavMenu = ({ navOptions, textField, relativePath = true, vertical, color }) => {
	const theme = useTheme();
	if (!color) {
		color = theme.palette.textDark;
	}

	return (
		<Grid container sx={{ flexDirection: vertical ? 'column' : 'row' }}>
			{navOptions.map((option) => {
				return (
					<Grid key={option[textField]} sx={{ whiteSpace: 'nowrap', margin: '0 0.5rem' }}>
						<Tooltip
							title={option.tooltipText || option[textField]}
							placement={'top-end'}
						>
							{relativePath ? (
								<Link to={option.url}>
									<Typography sx={{ color: color, textDecoration: 'underline' }}>
										{option[textField]}
									</Typography>
								</Link>
							) : (
								<a href={option.url} target={'_blank'} style={{ color: color }}>
									{option[textField]}
								</a>
							)}
						</Tooltip>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default NavMenu;
