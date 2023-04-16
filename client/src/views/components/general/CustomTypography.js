import { Link } from 'react-router-dom';
import { Typography, useTheme, useMediaQuery, Tooltip } from '@mui/material';

const CustomTypography = ({
	variant,
	textContent,
	textColor,
	hoverTextColor,
	tooltipText,
	to,
	relativePath
}) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	const customVariant = !variant ? (medAndUp ? 'body1' : 'body2') : variant;
	const customStyle = {
		color: textColor || theme.palette.linkDark
	};
	let finalStyle = customStyle;

	if (to) {
		finalStyle = {
			...finalStyle,
			'textDecoration': `underline ${customStyle.color}`,
			':hover': {
				color: hoverTextColor || theme.palette.linkHover,
				textDecoration: `underline ${hoverTextColor || theme.palette.linkHover}`
			}
		};
	}

	const FormattedTypography = (
		<Typography variant={customVariant} sx={finalStyle}>
			{textContent}
		</Typography>
	);

	let finalText = FormattedTypography;

	if (tooltipText) {
		finalText = (
			<Tooltip placement={'top'} title={tooltipText}>
				{to ? (
					relativePath ? (
						<Link to={to}>{FormattedTypography}</Link>
					) : (
						<a href={to} target={'_blank'}>
							{FormattedTypography}
						</a>
					)
				) : (
					FormattedTypography
				)}
			</Tooltip>
		);
	}

	return finalText;
};

export default CustomTypography;
