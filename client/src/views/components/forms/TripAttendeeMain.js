import { useEffect, useState } from 'react';
import { Grid, useTheme } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';
import TripAttendeeForm from './TripAttendee';
import CustomTypography from '../CustomTypography';
import CircularLoader from '../CircularLoader';

const TripAttendee = ({ formData, onSubmit, edit }) => {
	const theme = useTheme();

	const { user, crudFunctions } = useAuth();

	const { getFriendRequests } = crudFunctions;
	const [existingFriends, setExistingFriends] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function getExistingFriends() {
			const existingInvitedAttendees = formData.tripAttendees.map(
				(attendee) => attendee.attendeeUserID._id
			);
			const dataToSend = {
				variables: {
					requestedByUserID: user._id,
					pendingApprovalUserID: user._id,
					pendingApprovalUserEmail: user.email
				}
			};
			const { data } = await getFriendRequests(dataToSend);
			const friends = data.friendRequests.reduce((prev, next) => {
				let existing = prev;
				const { pendingApprovalUserID, requestedByUserID, status } = next;
				if (status === 'Approved') {
					const useRequestedByUserDetails = pendingApprovalUserID._id === user._id;
					// invite already sent, not including on list of options
					if (
						existingInvitedAttendees.includes(
							useRequestedByUserDetails
								? requestedByUserID._id
								: pendingApprovalUserID._id
						)
					) {
						return existing;
					}
					let dataForFriend = {
						value: useRequestedByUserDetails
							? requestedByUserID._id
							: pendingApprovalUserID._id,
						label: useRequestedByUserDetails
							? `${requestedByUserID.firstName} ${requestedByUserID.lastName}`
							: `${pendingApprovalUserID.firstName} ${pendingApprovalUserID.lastName}`
					};
					existing.push(dataForFriend);
				}
				return existing;
			}, []);

			setExistingFriends(friends);
			setLoading(false);
		}
		getExistingFriends();
	}, []);

	return (
		<>
			{loading && <CircularLoader />}
			{!loading && existingFriends.length === 0 ? (
				<Grid
					container
					flexDirection={'column'}
					alignItems={'center'}
					spacing={theme.spacing()}
				>
					<Grid item xs={12}>
						<CustomTypography
							textContent={
								'All of your current friends have been invited on this trip.'
							}
							variant={'subtitle'}
						/>
					</Grid>
					<Grid item xs={12}>
						<CustomTypography
							textContent={`View the friends page to request a new friend.`}
							to={`/friends`}
						/>
					</Grid>
				</Grid>
			) : (
				!loading &&
				existingFriends.length > 0 && (
					<TripAttendeeForm
						onSubmit={onSubmit}
						edit={edit}
						formData={{ ...formData, existingFriends: existingFriends }}
					/>
				)
			)}
		</>
	);
};

export default TripAttendee;
