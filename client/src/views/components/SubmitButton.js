import { Button, IconButton, useTheme } from '@mui/material';
import CustomTypography from './CustomTypography';
import CustomTooltip from './CustomTooltip';

const SubmitButton = ({
	title = 'Submit',
	tooltipText,
	tooltipPlacement,
	onClick,
	variant = 'contained',
	disabled = false,
	icon,
	type = 'submit',
	loading = false,
	customTypographyStyle = {},
	customButtonStyle = {}
}) => {
	const theme = useTheme();

	customTypographyStyle = {
		...customTypographyStyle,
		color: disabled ? theme.palette.text.disabled : theme.palette.text.dark
	};

	customButtonStyle = {
		...customButtonStyle,
		padding: 0
	};

	if (icon) {
		customButtonStyle = {
			...customButtonStyle,
			padding: '0.5rem',
			backgroundColor: 'none'
		};
	} else {
		if (!customButtonStyle.backgroundColor) {
			customButtonStyle = {
				...customButtonStyle,
				'backgroundColor': theme.palette.text.secondary,
				':hover': {
					backgroundColor: theme.palette.text.primary
				}
			};
		}
	}

	const FormattedIconButton = (
		<span>
			<CustomTooltip tooltipText={tooltipText}>
				<IconButton sx={customButtonStyle} onClick={onClick} disabled={disabled}>
					{icon}
				</IconButton>
			</CustomTooltip>
		</span>
	);
	const FormattedButton = (
		<span>
			<Button
				onClick={onClick}
				disabled={disabled}
				variant={variant}
				type={type}
				sx={customButtonStyle}
			>
				<CustomTypography
					textContent={title}
					customStyle={customTypographyStyle}
					button={true}
				/>
			</Button>
		</span>
	);
	const WithTooltip = (
		<CustomTooltip tooltipText={tooltipText} placement={tooltipPlacement}>
			{FormattedButton}
		</CustomTooltip>
	);
	return icon ? FormattedIconButton : tooltipText ? WithTooltip : FormattedButton;
};

export default SubmitButton;
