import { Link } from 'react-router-dom';
import { Typography, useTheme, useMediaQuery } from '@mui/material';
import CustomTooltip from './CustomTooltip';

const CustomTypography = ({
	variant,
	textContent,
	tooltipText,
	to,
	relativePath = true,
	icon,
	button,
	customStyle = {}
}) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	if (!customStyle.color) {
		customStyle = {
			...customStyle,
			color: theme.palette.text.primary
		};
	}

	if (!variant) {
		variant = medAndUp ? 'body1' : 'body2';
	}

	// typography is being used as a link component
	if (to) {
		customStyle = {
			...customStyle,
			'textDecoration': `underline ${customStyle.color}`,
			':hover': {
				color: theme.palette.text.secondary,
				textDecoration: `underline ${theme.palette.text.secondary}`
			}
		};
	}

	if (button) {
		customStyle = {
			...customStyle,
			padding: '0.5rem'
		};
	}

	const FormattedTypography = (
		<Typography variant={variant} sx={customStyle}>
			{icon && icon}
			{textContent}
		</Typography>
	);

	const WithTooltipAndLink = (
		<CustomTooltip tooltipText={tooltipText}>
			<Link to={to} target={!relativePath ? '_blank' : ''}>
				{FormattedTypography}
			</Link>
		</CustomTooltip>
	);

	const WithTooltipOnly = (
		<Link to={to} target={!relativePath ? '_blank' : ''}>
			{FormattedTypography}
		</Link>
	);

	const WithLinkOnly = (
		<CustomTooltip tooltipText={tooltipText} p>
			{FormattedTypography}
		</CustomTooltip>
	);

	const ComponentUsing =
		tooltipText && to
			? WithTooltipAndLink
			: to
			? WithTooltipOnly
			: tooltipText
			? WithLinkOnly
			: FormattedTypography;

	return ComponentUsing;
};

export default CustomTypography;
