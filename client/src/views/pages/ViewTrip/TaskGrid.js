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
			field: 'actualAmount',
			headerName: 'Spent',
			width: 125,
			editable: false
		},
		{
			field: 'maxAmount',
			headerName: 'Budget',
			width: 125,
			editable: false
		}
	];

	return (
		<DataGrid rows={data} columns={columns} collection={'task'} queryResults={queryResults} />
	);
};

export default ViewTaskGrid;
