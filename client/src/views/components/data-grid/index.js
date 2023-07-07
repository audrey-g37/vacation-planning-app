import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid as DataGridDisplay } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

// project imports
import Form from '../forms';
import CustomTypography from '../CustomTypography';
import SubmitButton from '../SubmitButton';
import { formatValue } from './formatting';

const DataGrid = ({
	rows,
	columns,
	viewIcon,
	editIcon,
	pageSizeOptions = [10, 25, 50],
	collection,
	queryResults,
	hidePagination = false,
	maxHeight = '70vh'
}) => {
	const theme = useTheme();
	const [dialogOpen, setDialogOpen] = useState({ open: false, formData: {} });

	const headerStylingObj = {
		backgroundColor: theme.palette.secondary.main,
		fontWeight: 600,
		fontSize: theme.typography.subtitle1,
		color: theme.palette.text.secondary
	};

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
		<Box sx={{ maxHeight: maxHeight, width: '100%' }}>
			<DataGridDisplay
				rows={rows}
				columns={columns}
				pageSizeOptions={pageSizeOptions}
				checkboxSelection
				disableRowSelectionOnClick
				hideFooter={hidePagination}
				sx={{ '& .MuiDataGrid-columnHeaders': headerStylingObj }}
			/>
		</Box>
	);
};

export default DataGrid;
