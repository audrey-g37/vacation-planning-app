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
import ListAltIcon from '@mui/icons-material/ListAlt';

import Form from '../forms';
import CustomTypography from '../CustomTypography';
import SubmitButton from '../SubmitButton';
import useAuth from 'hooks/useAuth';
import { formatValue } from 'utils/formatting';

const TableOfData = ({
	rows,
	columns,
	editIcon,
	viewIcon,
	collection,
	queryResults,
	showPagination = true,
	dataPerPage = 10,
	maxTableHeight = '70vh'
}) => {
	const theme = useTheme();

	const { navigate } = useAuth();

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
			fontSize: theme.typography.subtitle1,
			color: theme.palette.text.secondary
		}
	};

	if (editIcon) {
		columns.splice(1, 0, {
			id: 'edit',
			label: 'Edit',
			minWidth: 120
		});
	}

	if (viewIcon) {
		columns.splice(1, 0, {
			id: 'view',
			label: 'View',
			minWidth: 120
		});
	}

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
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
										{columns.map((column) => {
											let displayValue = row[column.id];
											let displayContent;
											if (column.id === 'edit') {
												displayContent = (
													<SubmitButton
														icon={<EditIcon />}
														tooltipText={'Edit'}
														onClick={() => {
															setDialogOpen({
																open: true,
																formData: row
															});
														}}
														customButtonStyle={{
															color: theme.palette.primary.main
														}}
													/>
												);
											} else if (column.id === 'view') {
												displayContent = (
													<SubmitButton
														icon={<ListAltIcon />}
														tooltipText={'View Details'}
														onClick={async () => {
															navigate(
																`/view-${collection}/${row._id}`
															);
														}}
														customButtonStyle={{
															color: theme.palette.primary.main
														}}
													/>
												);
											} else {
												let displayText = displayValue;
												if (column.format) {
													console.log({ displayValue });
													displayText = formatValue({
														...column.format,
														value: displayValue
													});
													console.log({ displayText });
												}
												displayContent = (
													<CustomTypography
														textContent={displayText || 'None'}
													/>
												);
											}

											return (
												<TableCell
													key={column.id}
													align={column.align || 'left'}
												>
													{displayContent}
												</TableCell>
											);
										})}
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
