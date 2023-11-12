import React from 'react';
import { Grid, useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import MainCard from 'views/components/MainCard';
import DataGrid from 'views/components/data-grid';

const ViewFriendRequests = ({ allFriendRequests = [], setFriendRequestData }) => {
	const theme = useTheme();

	const { user, crudFunctions } = useAuth();

	const { editFriendRequest } = crudFunctions;

	const approveRequests = async (selectedIds, buttonOne = true) => {
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
		if (matchingData) {
			const meets =
				matchingData.status === 'Pending' &&
				matchingData.pendingApprovalUserID?._id === user._id;
			return meets;
		}
	};

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
			<Grid container spacing={theme.spacing()}>
				<Grid item xs={12}>
					<MainCard
						title={'Friend Requests'}
						collection={'friendRequest'}
						newItem='Friend Request'
						queryResults={setFriendRequestData}
					>
						<DataGrid
							rows={allFriendRequests}
							allowSelection={true}
							onSelectionSave={approveRequests}
							checkRowSelectable={checkRowSelectable}
							columns={columns}
							collection={'friendRequest'}
							selectionButtonTitle={'Approve'}
							selectionButtonTitleTwo={'Deny'}
							queryResults={setFriendRequestData}
							useErrorButtonTwo={true}
						/>
					</MainCard>
				</Grid>
			</Grid>
		</>
	);
};

export default ViewFriendRequests;
