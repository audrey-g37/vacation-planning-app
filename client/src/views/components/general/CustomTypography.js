import { Link } from 'react-router-dom';
import { Typography, useTheme, useMediaQuery, Tooltip } from '@mui/material';

const CustomTypography = ({
	variant,
	textContent,
	textColor,
	hoverTextColor,
	tooltipText,
	to,
	relativePath = true
}) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	if (!variant) {
		variant = medAndUp ? 'body1' : 'body2';
	}
	if (!textColor) {
		textColor = theme.palette.linkDark;
	}
	if (!hoverTextColor) {
		hoverTextColor = theme.palette.linkHover;
	}
	let customStyle = {
		color: textColor
	};

	// typography is being used as a link component
	if (to) {
		customStyle = {
			...customStyle,
			'textDecoration': `underline ${customStyle.color}`,
			':hover': {
				color: hoverTextColor,
				textDecoration: `underline ${hoverTextColor}`
			}
		};
	}

	const FormattedTypography = (
		<Typography variant={variant} sx={customStyle}>
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
