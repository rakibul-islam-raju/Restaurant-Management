import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
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
import { useNavigate } from "react-router-dom";

export default function UsersTable({ data, showUserDetails }) {
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);

	const navigateToUserOrders = (user) => {
		navigate(`/orders/user/${user.id}`, { state: { user } });
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left">Name</TableCell>
						<TableCell align="left">Email</TableCell>
						<TableCell align="left">Date Joined</TableCell>
						<TableCell align="left">Active</TableCell>
						<TableCell align="left">Orders</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.results?.length > 0 ? (
						data?.results.map((row, i) => (
							<TableRow
								key={i}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{`${row.first_name} ${row.last_name}`}
								</TableCell>
								<TableCell align="left">{row.email}</TableCell>
								<TableCell align="left">
									{new Date(row.date_joined).toLocaleString()}
								</TableCell>
								<TableCell align="left">
									{row.is_active ? (
										<DoneIcon color="success" />
									) : (
										<CloseIcon color="error" />
									)}
								</TableCell>

								<TableCell align="left">
									<ButtonGroup>
										<Tooltip title="View Orders">
											<Button
												color="primary"
												size="small"
												type="button"
												onClick={() => navigateToUserOrders(row)}
											>
												<KeyboardDoubleArrowRightIcon />
											</Button>
										</Tooltip>
										{user?.is_superuser && (
											<Tooltip title="View Details">
												<Button
													color="primary"
													size="small"
													type="button"
													onClick={() => showUserDetails(row)}
												>
													<VisibilityIcon />
												</Button>
											</Tooltip>
										)}
									</ButtonGroup>
								</TableCell>
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
