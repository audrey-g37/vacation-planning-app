import { useParams } from 'react-router';
import { Grid } from '@mui/material';

// project imports
import MainCard from 'views/components/MainCard';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';

const ViewSingleTrip = ({ data }) => {
	const { id } = useParams();
	const { crudFunctions } = useAuth();
	const { getSingleTrip } = crudFunctions;

	const [tripData, setTripData] = useState(data || []);
	const [loading, setLoading] = useState(false);

	const getTripData = async () => {
		setLoading(true);
		const { data } = await getSingleTrip({ variables: { queryID: id } });
		setTripData(data.trip);
		setLoading(false);
	};

	useEffect(() => {
		!data && getTripData();
	}, []);

	console.log({ data, tripData });

	return <MainCard></MainCard>;
};

export default ViewSingleTrip;
