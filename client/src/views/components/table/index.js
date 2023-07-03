import * as React from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	IconButton,
	useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const TableOfData = ({
	rows,
	columns,
	edit,
	showPagination = true,
	dataPerPage = 10,
	maxTableHeight = '70vh'
}) => {
	const theme = useTheme();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(dataPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const headerStylingObj = {
		fontWeight: 600,
		fontSize: theme.typography.h6,
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.text.secondary
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
									sx={headerStylingObj}
								>
									{column.label}
								</TableCell>
							))}
							{edit && (
								<TableCell
									key={'edit'}
									align={'left'}
									style={{ minWidth: 50 }}
									sx={headerStylingObj}
								>
									'Edit'
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
													{value}
												</TableCell>
											);
										})}
										{edit && (
											<TableCell>
												<IconButton>
													<EditIcon
														sx={{
															color: theme.palette.primary.main
														}}
													/>
												</IconButton>
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
		</Paper>
	);
};

export default TableOfData;
