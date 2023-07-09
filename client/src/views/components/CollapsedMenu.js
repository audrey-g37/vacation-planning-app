import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Menu, MenuItem, MenuList, useTheme, useMediaQuery } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

// project imports
import CustomTypography from './CustomTypography';
import CustomTooltip from './CustomTooltip';
import CustomDivider from './CustomDivider';

const CollapsedMenu = ({
	options,
	textField,
	relativePath = true,
	tooltipText,
	textAlign = 'start'
}) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const MenuButton = (
		<Button variant={'text'} onClick={handleClick}>
			<MenuRoundedIcon />
		</Button>
	);

	return (
		<>
			{tooltipText ? (
				<CustomTooltip tooltipText={tooltipText}>{MenuButton}</CustomTooltip>
			) : (
				<MenuButton />
			)}

			<Menu
				open={open}
				elevation={0}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				anchorEl={anchorEl}
				onClose={handleClose}
				sx={{
					'& .MuiPaper-root': {
						backgroundColor: 'unset'
					}
				}}
			>
				<MenuList
					sx={{
						border: `solid ${theme.palette.primary.main} 0.025rem`,
						borderRadius: '10%',
						backgroundColor: theme.palette.custom.navBackground
					}}
				>
					{options.map((option, index) => {
						const { url, onClick } = option;
						return (
							<div key={option[textField]}>
								<MenuItem
									key={option[textField]}
									component={Link}
									to={url ? url : '#'}
									onClick={() => (onClick ? onClick() : handleClose())}
									target={!relativePath ? '_blank' : ''}
									sx={{
										justifyContent: textAlign,
										whiteSpace: 'nowrap',
										borderRadius: '10%',
										padding: `0 ${medAndUp ? 1 : 0}rem`,
										margin: `0 ${medAndUp ? 1 : 0.5}rem`,
										minHeight: '0.5rem'
									}}
								>
									<CustomTypography
										textContent={option[textField]}
										customStyle={{ padding: 0 }}
									/>
								</MenuItem>
								{index !== options.length - 1 && <CustomDivider />}
							</div>
						);
					})}
				</MenuList>
			</Menu>
		</>
	);
};

export default CollapsedMenu;
