import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Alert, Button, ButtonGroup, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function OrderTable({ data, editMenuHandler }) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left">Customer Name</TableCell>
						<TableCell align="left">Customer Email</TableCell>
						<TableCell align="left">Total</TableCell>
						<TableCell align="left">Tax</TableCell>
						<TableCell align="left">Paid</TableCell>
						<TableCell align="left">Served</TableCell>
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
								<TableCell component="th" scope="row">
									{`${row.user.first_name} ${row.user.last_name}`}
								</TableCell>
								<TableCell align="left">{row.user.email}</TableCell>
								<TableCell align="left">{row.total_price}</TableCell>
								<TableCell align="left">{row.tax}</TableCell>
								<TableCell align="left">
									{row.is_paid ? (
										<DoneIcon color="success" />
									) : (
										<CloseIcon color="error" />
									)}
								</TableCell>
								<TableCell align="left">
									{row.is_served ? (
										<DoneIcon color="success" />
									) : (
										<CloseIcon color="error" />
									)}
								</TableCell>
								<TableCell align="left">
									{new Date(row.created_at).toLocaleString()}
								</TableCell>
								<TableCell align="left">
									{new Date(row.updated_at).toLocaleString()}
								</TableCell>
								<TableCell align="left">
									{row.is_active ? (
										<DoneIcon color="success" />
									) : (
										<CloseIconCloseIcon color="error" />
									)}
								</TableCell>
								<TableCell align="left">
									<ButtonGroup>
										<Tooltip title="View Details">
											<Button
												color="primary"
												size="small"
												type="button"
												onClick={() => editMenuHandler(row)}
											>
												<VisibilityIcon />
											</Button>
										</Tooltip>
									</ButtonGroup>
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
