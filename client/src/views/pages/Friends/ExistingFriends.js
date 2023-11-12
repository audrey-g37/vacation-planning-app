import React from 'react';
import { Grid, useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import MainCard from 'views/components/MainCard';
import DataGrid from 'views/components/data-grid';
import { sortFriends } from 'utils/sorting';

const ViewFriendList = ({ allFriends = [] }) => {
	const theme = useTheme();

	const { user } = useAuth();

	const simplifiedFriends = allFriends.reduce((prev, next) => {
		const chosenField =
			next.pendingApprovalUserID._id !== user._id
				? 'pendingApprovalUserID'
				: 'requestedByUserID';
		const chosenFriendValue = next[chosenField];
		next = {
			...next,
			name: `${chosenFriendValue.firstName} ${chosenFriendValue.lastName}`,
			email: chosenFriendValue.email
		};
		prev.push(next);
		return prev;
	}, []);

	const sortedFriends = sortFriends({ data: simplifiedFriends, fieldName: 'name' });

	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			width: 200,
			editable: false
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 250,
			editable: false
		}
	];

	return (
		<>
			<Grid container spacing={theme.spacing()}>
				<Grid item xs={12}>
					<MainCard title={'Associated Friends'}>
						<DataGrid rows={sortedFriends} columns={columns} />
					</MainCard>
				</Grid>
			</Grid>
		</>
	);
};

export default ViewFriendList;
