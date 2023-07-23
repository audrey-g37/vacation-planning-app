import { useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import { DataGrid as DataGridDisplay } from '@mui/x-data-grid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';

// project imports
import Form from '../forms';
import SubmitButton from '../SubmitButton';
import { formatValue } from '../../../utils/formatting';
import useAuth from 'hooks/useAuth';

const DataGrid = ({
	rows,
	columns,
	viewIcon,
	editIcon,
	collection,
	queryResults,
	allowSelection = false,
	onSelectionSave,
	selectionButtonTitle = 'Update',
	selectionButtonTitleTwo,
	hidePagination = false,
	maxHeight = '70vh',
	checkRowSelectable
}) => {
	const theme = useTheme();
	const { navigate } = useAuth();

	const [selectedRowIds, setSelectedRowIds] = useState([]);
	const [dialogOpen, setDialogOpen] = useState({ open: false, formData: {} });

	const headerStylingObj = {
		backgroundColor: theme.palette.secondary.main,
		fontWeight: 600,
		fontSize: theme.typography.subtitle1,
		color: theme.palette.text.secondary
	};

	if (editIcon) {
		columns.splice(1, 0, {
			field: 'edit',
			headerName: 'Edit',
			width: 120,
			editable: false,
			renderCell: ({ row: selectedRow }) => (
				<SubmitButton
					icon={<EditIcon />}
					tooltipText={'Edit'}
					onClick={() => {
						setDialogOpen({
							open: true,
							formData: rows.find((row) => row._id === selectedRow._id)
						});
					}}
					customButtonStyle={{
						color: theme.palette.primary.main
					}}
				/>
			)
		});
	}

	if (viewIcon) {
		columns.splice(1, 0, {
			field: 'view',
			headerName: 'View',
			width: 120,
			editable: false,
			renderCell: ({ row }) => (
				<SubmitButton
					icon={<ListAltIcon />}
					tooltipText={'View Details'}
					onClick={async () => {
						navigate(`/view-${collection}/${row._id}`);
					}}
					customButtonStyle={{
						color: theme.palette.primary.main
					}}
				/>
			)
		});
	}
	const displayRows = rows.map((row) => {
		for (let [key, value] of Object.entries(row)) {
			const colMatch = columns.find((col) => col.field === key);
			if (colMatch?.format || colMatch?.type === 'date') {
				const { format } = colMatch;
				let formatObj = {
					gridView: true,
					value: value,
					type: format?.type || colMatch?.type,
					subField: format?.subField || colMatch.field,
					getValue: format?.getValue
				};
				if (colMatch?.type === 'date') {
					formatObj = { ...formatObj, dateObj: true };
				}
				value = formatValue(formatObj);
				row = { ...row, [key]: value };
			}
		}
		return (row = { ...row, id: row._id });
	});

	return (
		<Grid container sx={{ width: '100%', height: maxHeight }} spacing={theme.spacing()}>
			<Grid item xs={12} sx={{ height: '90%' }}>
				<DataGridDisplay
					rows={displayRows}
					columns={columns}
					checkboxSelection={allowSelection}
					onRowSelectionModelChange={(rowSelection) => setSelectedRowIds(rowSelection)}
					isRowSelectable={
						checkRowSelectable ? ({ row }) => checkRowSelectable(row) : null
					}
					disableRowSelectionOnClick
					hideFooter={hidePagination}
					sx={{
						'& .MuiDataGrid-columnHeaders': headerStylingObj,
						'& .MuiDataGrid-withBorderColor': {
							borderColor: theme.palette.secondary.main
						},
						'borderColor': theme.palette.secondary.main
					}}
				/>
				{dialogOpen && (
					<Form
						isOpen={dialogOpen.open}
						formData={dialogOpen.formData}
						setClosed={() => setDialogOpen({ ...dialogOpen, open: false })}
						queryResults={queryResults}
						collection={collection}
						edit={true}
					/>
				)}
			</Grid>
			{allowSelection && (
				<Grid item xs={12}>
					<Grid container sx={{ flexDirection: 'row' }}>
						<Grid item xs={5} sm={3} md={2} xl={1}>
							<SubmitButton
								title={selectionButtonTitle}
								onClick={async () => {
									await onSelectionSave(selectedRowIds);
									setSelectedRowIds([]);
									queryResults && (await queryResults());
								}}
								disabled={selectedRowIds.length === 0}
							/>
						</Grid>
						{selectionButtonTitleTwo && (
							<Grid item xs={5} sm={3} md={2} xl={1}>
								<SubmitButton
									title={selectionButtonTitleTwo}
									onClick={async () => {
										await onSelectionSave(selectedRowIds, { buttonOne: false });
										setSelectedRowIds([]);
										queryResults && (await queryResults());
									}}
									disabled={selectedRowIds.length === 0}
								/>
							</Grid>
						)}
					</Grid>
				</Grid>
			)}
		</Grid>
	);
};

export default DataGrid;
