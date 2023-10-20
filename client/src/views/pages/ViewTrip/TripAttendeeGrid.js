import React, { useState, useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import CircularLoader from 'views/components/CircularLoader';
import DataGrid from 'views/components/data-grid';

const ViewAttendeesForTrip = ({ data, queryResults }) => {
	const theme = useTheme();

	const columns = [
		{
			field: 'attendeeUserID',
			headerName: 'Name',
			width: 200,
			editable: false,
			format: {
				type: 'subField'
			}
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 175,
			editable: false
		}
	];

	return (
		<DataGrid
			rows={data}
			columns={columns}
			collection={'tripAttendee'}
			queryResults={queryResults}
		/>
	);
};

export default ViewAttendeesForTrip;
