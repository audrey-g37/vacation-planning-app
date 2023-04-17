import { Button } from '@mui/material';
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
	loading = false
}) => {
	const FormattedButton = (
		<span>
			<Button onClick={onClick} disabled={disabled} variant={variant}>
				<CustomTypography textContent={title} icon={icon} />
			</Button>
		</span>
	);
	const WithTooltipOnly = (
		<CustomTooltip tooltipText={tooltipText} placement={tooltipPlacement}>
			{FormattedButton}
		</CustomTooltip>
	);
	return tooltipText ? WithTooltipOnly : FormattedButton;
};

export default SubmitButton;
