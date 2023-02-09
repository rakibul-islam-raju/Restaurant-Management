import { Alert, Button, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function CategoryTable({
	data,
	editCategoryHandler,
	deleteHandler,
}) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left">Name</TableCell>
						<TableCell align="left">Created At</TableCell>
						<TableCell align="left">Updated At</TableCell>
						<TableCell align="left">Active</TableCell>
						<TableCell align="left">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.results?.length > 0 ? (
						data?.results.map((row) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row" align="left">
									{row.name}
								</TableCell>

								<TableCell align="left">
									{new Date(row.created_at).toLocaleString()}
								</TableCell>
								<TableCell align="left">
									{new Date(row.updated_at).toLocaleString()}
								</TableCell>
								<TableCell align="left">
									{row.is_active ? "Yes" : "no"}
								</TableCell>
								<TableCell align="left">
									<Stack direction={"row"}>
										<Button
											color="primary"
											size="small"
											onClick={() => editCategoryHandler(row)}
										>
											Edit
										</Button>
										<Button
											color="error"
											size="small"
											onClick={() => deleteHandler(row.id)}
										>
											Delete
										</Button>
									</Stack>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow colspan={8}>
							<Alert severity="warning">No Data Found!</Alert>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
