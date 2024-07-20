// project imports
import DataGrid from 'views/components/data-grid';

const ViewTaskGrid = ({ data, queryResults }) => {
	// todo: update with task fields
	const columns = [
		{
			field: 'title',
			headerName: 'Title',
			width: 175,
			editable: false
		},
		{
			field: 'textDetails',
			headerName: 'Details',
			width: 125,
			editable: false
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 125,
			editable: false
		},
		{
			field: 'assignedToUserID',
			headerName: 'Assigned To',
			width: 125,
			editable: false,
			format: {
				type: 'subField'
			}
		}
	];

	return (
		<DataGrid rows={data} columns={columns} collection={'task'} queryResults={queryResults} />
	);
};

export default ViewTaskGrid;
