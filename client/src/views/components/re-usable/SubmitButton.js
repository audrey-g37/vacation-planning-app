import { Button } from '@mui/material';
import CustomTypography from './CustomTypography.js';
import CustomTooltip from './CustomTooltip.js';

const SubmitButton = ({
	title = 'Submit',
	tooltipText,
	tooltipPlacement,
	onClick,
	variant = 'contained',
	disabled = false,
	icon,
	type = 'submit',
	loading = false
}) => {
	const FormattedButton = (
		<span>
			<Button onClick={onClick} disabled={disabled} variant={variant} type={type}>
				<CustomTypography textContent={title} icon={icon} button={true} />
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
