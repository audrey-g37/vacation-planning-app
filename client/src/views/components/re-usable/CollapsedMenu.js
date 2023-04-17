import React, { useState } from 'react';

import { Button, Link, Menu, MenuItem, MenuList, useTheme } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

// project imports
import CustomTypography from './CustomTypography';
import CustomTooltip from './CustomTooltip';

const CollapsedMenu = ({ options, textField, relativePath = true, tooltipText }) => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const MenuButton = (
		<Button
			variant={'text'}
			onClick={handleClick}
			sx={{
				'&:hover': {
					backgroundColor: theme.palette.background
				}
			}}
		>
			{<MenuRoundedIcon />}
		</Button>
	);

	return (
		<>
			{tooltipText ? (
				<CustomTooltip tooltipText={tooltipText}>{MenuButton}</CustomTooltip>
			) : (
				MenuButton
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
			>
				<MenuList
					sx={{
						border: 'solid 0.025rem',
						borderRadius: '10%',
						padding: 0,
						backgroundColor: theme.palette.navBackground
					}}
				>
					{options.map((option, index) => {
						const { url, tooltipText } = option;
						return (
							<MenuItem
								key={option[textField]}
								component={Link}
								href={url}
								target={!relativePath ? '_blank' : ''}
								sx={{
									'whiteSpace': 'nowrap',
									'margin': '0',
									'padding': '0.25rem',
									'borderRadius': '10%',
									'borderBottom':
										index < options.length - 1 ? 'solid 0.025rem' : '',
									'&:hover': {
										backgroundColor: theme.palette.background
									}
								}}
							>
								<CustomTypography
									textContent={option[textField]}
									tooltipText={tooltipText || option[textField]}
								/>
							</MenuItem>
						);
					})}
				</MenuList>
			</Menu>
		</>
	);
};

export default CollapsedMenu;
