import React, { useState } from 'react';

import {
	Button,
	Divider,
	Link,
	Menu,
	MenuItem,
	MenuList,
	useTheme,
	useMediaQuery
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

// project imports
import CustomTypography from './CustomTypography';
import CustomTooltip from './CustomTooltip';

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
						const { url, tooltipText, onClick } = option;
						return (
							<div key={option[textField]}>
								<MenuItem
									key={option[textField]}
									component={Link}
									href={url ? url : '#'}
									onClick={onClick}
									target={!relativePath ? '_blank' : ''}
									sx={{
										justifyContent: textAlign,
										whiteSpace: 'nowrap',
										borderRadius: '10%',
										padding: `0 ${medAndUp ? 1 : 0}rem`,
										margin: `0 ${medAndUp ? 1 : 0.5}rem`
									}}
								>
									<CustomTypography
										textContent={option[textField]}
										tooltipText={tooltipText || option[textField]}
									/>
								</MenuItem>
								{index !== options.length - 1 && <Divider />}
							</div>
						);
					})}
				</MenuList>
			</Menu>
		</>
	);
};

export default CollapsedMenu;
