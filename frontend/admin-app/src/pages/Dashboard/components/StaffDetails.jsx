import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";

export default function StaffDetails({ data }) {
	return (
		<Box>
			<TableContainer>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>First Name</TableCell>
							<TableCell>{data?.first_name}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Last Name</TableCell>
							<TableCell>{data?.last_name}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Email Address</TableCell>
							<TableCell>{data?.email}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Active Status</TableCell>
							<TableCell>
								{data?.is_active ? (
									<DoneIcon color="success" />
								) : (
									<CloseIcon color="error" />
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Super Admin</TableCell>
							<TableCell>
								{data?.is_superuser ? (
									<DoneIcon color="success" />
								) : (
									<CloseIcon color="error" />
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date Joined</TableCell>
							<TableCell>
								{new Date(data?.date_joined).toLocaleString()}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Last Login</TableCell>
							<TableCell>
								{data?.last_login
									? new Date(data?.last_login).toLocaleString()
									: ""}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
