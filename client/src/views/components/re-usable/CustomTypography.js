import { Typography, useTheme, useMediaQuery, Link } from '@mui/material';
import CustomTooltip from './CustomTooltip';

const CustomTypography = ({
	variant,
	textContent,
	tooltipText,
	to,
	relativePath = true,
	icon,
	customStyle = {}
}) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

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

	const FormattedTypography = (
		<Typography variant={variant} sx={customStyle}>
			{icon && icon}
			{textContent}
		</Typography>
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

	return tooltipText && to
		? WithTooltipAndLink
		: to
		? WithTooltipOnly
		: tooltipText
		? WithLinkOnly
		: FormattedTypography;
};

export default CustomTypography;
