import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Tooltip } from '@mui/material';

const CustomTooltip = forwardRef(
	({ placement = 'top', tooltipText, children, followCursor = false, ...others }, ref) => {
		return (
			<Tooltip
				ref={ref}
				{...others}
				placement={placement}
				title={tooltipText}
				followCursor={followCursor}
			>
				{children}
			</Tooltip>
		);
	}
);

CustomTooltip.propTypes = {
	placement: PropTypes.string,
	tooltipText: PropTypes.string,
	children: PropTypes.node
};

export default CustomTooltip;
