import React, { useState, useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import MainCard from 'views/components/MainCard';
import CircularLoader from 'views/components/CircularLoader';
import DataGrid from 'views/components/data-grid';
import ViewFriendRequests from './Requests';

const ViewFriends = () => {
	const theme = useTheme();

	const { user, crudFunctions } = useAuth();

	const { getFriendRequests } = crudFunctions;

	const [allFriendRequests, setAllFriendRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	const setFriendRequestData = async () => {
		!loading && setLoading(true);
		const dataToSend = {
			variables: {
				requestedByUserID: user._id,
				pendingApprovalUserID: user._id,
				pendingApprovalUserEmail: user.email
			}
		};
		const { data } = await getFriendRequests(dataToSend);

		const friendRequestsToView = data?.friendRequests.filter(
			(friendReq) =>
				friendReq.status !== 'Approved' &&
				!(
					friendReq.status === 'Denied' &&
					friendReq.pendingApprovalUserID?._id === user._id
				)
		);

		setAllFriendRequests(friendRequestsToView);
		setLoading(false);
	};

	useEffect(() => {
		user && setFriendRequestData();
	}, [user?._id]);

	const columns = [
		{
			field: 'status',
			headerName: 'Status',
			width: 175,
			editable: false
		},
		{
			field: 'pendingApprovalUserID',
			headerName: 'Waiting For',
			width: 200,
			editable: false,
			format: {
				type: 'subField'
			}
		},
		{
			field: 'requestedByUserID',
			headerName: 'Requested By',
			width: 200,
			editable: false,
			format: {
				type: 'subField'
			}
		},
		{
			field: 'pendingApprovalUserEmail',
			headerName: 'Email',
			width: 250,
			editable: false
		},
		{
			field: 'dateReviewed',
			headerName: 'Date Reviewed',
			width: 225,
			editable: false,
			type: 'date'
		}
	];

	return (
		<>
			{loading && <CircularLoader />}

			<Grid container spacing={theme.spacing()}>
				<Grid item xs={12}>
					<ViewFriendRequests
						allFriendRequests={allFriendRequests}
						setFriendRequestData={setFriendRequestData}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default ViewFriends;
