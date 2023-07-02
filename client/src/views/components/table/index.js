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

const TableOfData = ({ rows, columns, edit, showPagination = true }) => {
	const theme = useTheme();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align || 'left'}
									style={{ minWidth: column.minWidth }}
									sx={{ fontWeight: 600 }}
								>
									{column.label}
								</TableCell>
							))}
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
														sx={{ color: theme.palette.primary.main }}
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
