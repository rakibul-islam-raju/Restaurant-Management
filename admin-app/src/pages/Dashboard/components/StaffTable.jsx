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
import { useSelector } from "react-redux";

export default function StaffTable({ data, staffEditHandler }) {
	const { user } = useSelector((state) => state.auth);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left">Name</TableCell>
						<TableCell align="left">Email</TableCell>
						<TableCell align="left">Role</TableCell>
						<TableCell align="left">Active</TableCell>
						{user?.is_superuser && <TableCell align="left">Action</TableCell>}
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
									{`${row.first_name} ${row.last_name}`}
								</TableCell>
								<TableCell align="left">{row.email}</TableCell>
								<TableCell align="left">
									{row.is_superuser ? "Super Admin" : "Staff"}
								</TableCell>
								<TableCell align="left">
									{row.is_active ? (
										<DoneIcon color="success" />
									) : (
										<CloseIcon color="error" />
									)}
								</TableCell>

								{user?.is_superuser && (
									<TableCell align="left">
										<ButtonGroup>
											<Tooltip title="View Details">
												<Button
													color="primary"
													size="small"
													type="button"
													onClick={() => staffEditHandler(row)}
												>
													<VisibilityIcon />
												</Button>
											</Tooltip>
										</ButtonGroup>
									</TableCell>
								)}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={10}>
								<Alert severity="warning">No Data Found!</Alert>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
