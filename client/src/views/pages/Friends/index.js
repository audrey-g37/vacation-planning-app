import React, { useState, useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import CircularLoader from 'views/components/CircularLoader';
import ViewFriendRequests from './Requests';
import ViewFriendList from './ExistingFriends';

const ViewFriends = () => {
	const theme = useTheme();

	const { user, crudFunctions } = useAuth();

	const { getFriendRequests } = crudFunctions;

	const [allFriends, setAllFriends] = useState({
		approved: [],
		pending: []
	});
	const [loading, setLoading] = useState(true);

	const setFriendData = async () => {
		!loading && setLoading(true);
		const dataToSend = {
			variables: {
				requestedByUserID: user._id,
				pendingApprovalUserID: user._id,
				pendingApprovalUserEmail: user.email
			}
		};
		const { data } = await getFriendRequests(dataToSend);

		const sortedFriends = data?.friendRequests.reduce(
			(prev, next) => {
				if (next.status === 'Approved') {
					prev.approved.push(next);
				} else if (
					next.status !== 'Approved' &&
					!(next.status === 'Denied' && next.pendingApprovalUserID?._id === user._id)
				) {
					prev.pending.push(next);
				}
				return prev;
			},
			{ pending: [], approved: [] }
		);

		setAllFriends(sortedFriends);
		setLoading(false);
	};

	useEffect(() => {
		user && setFriendData();
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
						allFriendRequests={allFriends?.pending || []}
						setFriendRequestData={setFriendData}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default ViewFriends;
