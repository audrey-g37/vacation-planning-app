import React, { useState, useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import MainCard from 'views/components/MainCard';
import CircularLoader from 'views/components/CircularLoader';
import DataGrid from 'views/components/data-grid';

const ViewFriends = () => {
	const theme = useTheme();

	const { user, crudFunctions } = useAuth();

	const { getFriendRequests, editFriendRequest } = crudFunctions;

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
			(friend) =>
				friend.status !== 'Approved' &&
				!(friend.status === 'Denied' && friend.pendingApprovalUserID._id === user._id)
		);

		setAllFriendRequests(friendRequestsToView);
		setLoading(false);
	};

	const approveRequests = async (selectedIds, { buttonOne = true }) => {
		let approvalObj = {
			status: buttonOne ? 'Approved' : 'Denied',
			dateReviewed: new Date()
		};
		for (const id of selectedIds) {
			await editFriendRequest({ variables: { ...approvalObj, queryID: id } });
		}
	};

	const checkRowSelectable = (row) => {
		const matchingData = allFriendRequests.find((friend) => friend._id === row._id);
		const meets =
			matchingData.status === 'Pending' &&
			matchingData.pendingApprovalUserID._id === user._id;
		return meets;
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
			field: 'requestedByUserID',
			headerName: 'Requested By',
			width: 200,
			editable: false,
			format: {
				type: 'subField'
			}
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
					<MainCard
						title={'Friend Requests'}
						collection={'friendRequest'}
						newItem='Friend Request'
						queryResults={setFriendRequestData}
					>
						<DataGrid
							rows={allFriendRequests || []}
							allowSelection={true}
							onSelectionSave={approveRequests}
							checkRowSelectable={checkRowSelectable}
							columns={columns}
							collection={'friendRequest'}
							selectionButtonTitle={'Approve'}
							selectionButtonTitleTwo={'Deny'}
							queryResults={setFriendRequestData}
						/>
					</MainCard>
				</Grid>
			</Grid>
		</>
	);
};

export default ViewFriends;
