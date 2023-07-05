import { useState } from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import Form from '../forms';
import CustomTypography from '../CustomTypography';
import SubmitButton from '../SubmitButton';

const TableOfData = ({
	rows,
	columns,
	edit,
	collection,
	queryResults,
	showPagination = true,
	dataPerPage = 10,
	maxTableHeight = '70vh'
}) => {
	const theme = useTheme();

	const [dialogOpen, setDialogOpen] = useState({ open: false, formData: {} });

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(dataPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const headerStylingObj = {
		row: { backgroundColor: theme.palette.secondary.main },
		typography: {
			fontWeight: 600,
			fontSize: theme.typography.h6,
			color: theme.palette.text.secondary
		}
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'auto' }}>
			<TableContainer sx={{ maxHeight: maxTableHeight }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align || 'left'}
									style={{ minWidth: column.minWidth }}
									sx={headerStylingObj.row}
								>
									<CustomTypography
										textContent={column.label}
										customStyle={headerStylingObj.typography}
									/>
								</TableCell>
							))}
							{edit && (
								<TableCell
									key={'edit'}
									align={'left'}
									style={{ minWidth: 50 }}
									sx={headerStylingObj.row}
								>
									<CustomTypography
										textContent={'Edit'}
										customStyle={headerStylingObj.typography}
									/>
								</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
										{columns.map((column) => {
											let value = row[column.id];
											if (column.format) {
												value = column.format(value);
											}
											return (
												<TableCell
													key={column.id}
													align={column.align || 'left'}
												>
													<CustomTypography
														textContent={value || 'None'}
													/>
												</TableCell>
											);
										})}
										{edit && (
											<TableCell>
												<SubmitButton
													icon={<EditIcon />}
													tooltipText={'Edit'}
													onClick={async () => {
														setDialogOpen({
															...dialogOpen,
															open: true,
															formData: row
														});
													}}
													customStyle={{
														color: theme.palette.text.primary
													}}
												/>
											</TableCell>
										)}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			{showPagination && (
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
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
		</Paper>
	);
};

export default TableOfData;
