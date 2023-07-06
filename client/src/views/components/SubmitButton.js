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
	customStyle = {}
}) => {
	const theme = useTheme();

	if (!customStyle.color) {
		customStyle.color = theme.palette.text.secondary;
	}

	let typographyCustomStyle = {
		...customStyle,
		color: disabled ? theme.palette.text.disabled : theme.palette.text.dark
	};

	let buttonStyle = {
		...customStyle,
		padding: 0,
		backgroundColor: theme.palette.text.secondary
	};

	if (icon) {
		buttonStyle = {
			...buttonStyle,
			padding: '0.5rem',
			backgroundColor: 'none'
		};
	} else {
		buttonStyle = {
			...buttonStyle,
			'backgroundColor': theme.palette.text.secondary,
			':hover': {
				backgroundColor: theme.palette.text.primary
			}
		};
	}

	const FormattedIconButton = (
		<span>
			<CustomTooltip tooltipText={tooltipText}>
				<IconButton sx={buttonStyle} onClick={onClick} disabled={disabled}>
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
				sx={buttonStyle}
			>
				<CustomTypography
					textContent={title}
					customStyle={typographyCustomStyle}
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
