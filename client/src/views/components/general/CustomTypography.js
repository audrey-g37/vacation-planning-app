import { Typography, useTheme, useMediaQuery, Tooltip, Link } from '@mui/material';

const CustomTypography = ({ variant, textContent, tooltipText, to, relativePath = true, icon }) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	if (!variant) {
		variant = medAndUp ? 'body1' : 'body2';
	}
	let customStyle = {};

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
		<>
			{icon && icon}
			{textContent && (
				<Typography variant={variant} sx={customStyle}>
					{textContent}
				</Typography>
			)}
		</>
	);

	let finalText = FormattedTypography;
	let withTooltip;

	if (tooltipText) {
		withTooltip = (
			<Tooltip placement={'top'} title={tooltipText}>
				{FormattedTypography}
			</Tooltip>
		);
	}
	if (to) {
		finalText = (
			<Link href={to} target={!relativePath ? '_blank' : ''}>
				{withTooltip || FormattedTypography}
			</Link>
		);
	} else finalText = withTooltip ? withTooltip : finalText;

	return finalText;
};

export default CustomTypography;
