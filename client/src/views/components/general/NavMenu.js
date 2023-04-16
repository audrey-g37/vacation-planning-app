import { Link } from 'react-router-dom';
import { Grid, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import CustomTypography from './CustomTypography';

const NavMenu = ({
	navOptions,
	textField,
	relativePath = true,
	vertical,
	color,
	hoverTextColor
}) => {
	const theme = useTheme();
	if (!color) {
		color = theme.palette.black;
	}
	if (!hoverTextColor) {
		hoverTextColor = theme.palette.linkDark;
	}

	return (
		<Grid container sx={{ flexDirection: vertical ? 'column' : 'row' }}>
			{navOptions.map((option) => {
				return (
					<Grid key={option[textField]} sx={{ whiteSpace: 'nowrap', margin: '0 0.5rem' }}>
						<CustomTypography
							textContent={option[textField]}
							to={option.url}
							textColor={color}
							hoverTextColor={hoverTextColor}
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
