// project imports
import DataGrid from 'views/components/data-grid';

const ViewBudgetGrid = ({ data, queryResults }) => {
	const columns = [
		{
			field: 'purchasedByUserID',
			headerName: 'Name',
			width: 200,
			editable: false,
			format: {
				type: 'subField'
			}
		},
		{
			field: 'actualAmount',
			headerName: 'Cost',
			width: 175,
			editable: false
		}
	];

	return (
		<DataGrid rows={data} columns={columns} collection={'budget'} queryResults={queryResults} />
	);
};

export default ViewBudgetGrid;
