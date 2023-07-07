import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid as DataGridDisplay } from '@mui/x-data-grid';
import { formatValue } from './formatting';

const DataGrid = ({
	rows,
	columns,
	viewIcon,
	editIcon,
	pageSizeOptions = [10, 25, 50],
	collection,
	queryResults,
	hidePagination,
	maxHeight
}) => {
	rows = rows.map((row) => {
		for (let [key, value] of Object.entries(row)) {
			const colMatch = columns.find((col) => col.field === key);
			if (colMatch?.format || colMatch?.type === 'date') {
				const { format } = colMatch;
				value = formatValue({
					value: value,
					type: format?.type || colMatch?.type,
					subField: format?.subField,
					getValue: format?.getValue
				});
				row = { ...row, [key]: value };
			}
		}
		return (row = { ...row, id: row._id });
	});
	return (
		<Box sx={{ height: 400, width: '100%' }}>
			<DataGridDisplay
				rows={rows}
				columns={columns}
				pageSizeOptions={pageSizeOptions}
				checkboxSelection
				disableRowSelectionOnClick
				hideFooter={hidePagination}
			/>
		</Box>
	);
};

export default DataGrid;
