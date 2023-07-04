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
	let typographyCustomStyle = {
		...customStyle,
		color: disabled ? theme.palette.text.disabled : theme.palette.text.enabled
	};

	let buttonStyle = {
		backgroundColor: theme.palette.action.selected
	};

	if (icon) {
		buttonStyle = {
			...buttonStyle,
			'backgroundColor': 'none',
			'color': theme.palette.text.primary,
			'&:hover': {
				color: theme.palette.text.secondary
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
