import { Typography, useTheme, useMediaQuery, Link, IconButton } from '@mui/material';
import CustomTooltip from './CustomTooltip';

const CustomTypography = ({
	variant,
	textContent,
	tooltipText,
	to,
	relativePath = true,
	icon,
	button,
	onClick,
	customStyle = {}
}) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	if (!customStyle.color) {
		customStyle = {
			...customStyle,
			color: button ? theme.palette.text.primary : theme.palette.primary.main
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
				color: theme.palette.primary.light,
				textDecoration: `underline ${theme.palette.primary.light}`
			}
		};
	}

	if (button) {
		customStyle = {
			...customStyle,
			':hover': {
				color: theme.palette.primary.dark
			}
		};
	}

	const FormattedTypography = (
		<Typography variant={variant} sx={customStyle}>
			{icon && icon}
			{textContent}
		</Typography>
	);

	const WithTooltipAndButton = (
		<CustomTooltip tooltipText={tooltipText}>
			<IconButton onClick={onClick} sx={customStyle}>
				{icon}
			</IconButton>
		</CustomTooltip>
	);

	const WithTooltipAndLink = (
		<CustomTooltip tooltipText={tooltipText}>
			<Link href={to} target={!relativePath ? '_blank' : ''}>
				{FormattedTypography}
			</Link>
		</CustomTooltip>
	);

	const WithTooltipOnly = (
		<Link href={to} target={!relativePath ? '_blank' : ''}>
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
			: button
			? WithTooltipAndButton
			: tooltipText
			? WithLinkOnly
			: FormattedTypography;

	return ComponentUsing;
};

export default CustomTypography;