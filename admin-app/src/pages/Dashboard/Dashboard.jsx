import {
	Alert,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import { useState } from "react";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { useGetOrdersQuery } from "../../features/orders/orderApi";
import { useGetSummaryQuery } from "../../features/statistics/statisticsApi";
import { useGetStaffsQuery } from "../../features/users/usersApi";
import OrderShortTable from "./components/OrderShortTable";
import StaffDetails from "./components/StaffDetails";
import StaffTable from "./components/StaffTable";

const useStyles = makeStyles((theme) => ({
	card: {
		backgroundColor: theme.palette.gray.light,
		color: "#fff",
	},
	cardBottom: {
		backgroundColor: theme.palette.primary.dark,
		textAlign: "center",
		display: "block",
	},
}));

export default function Dashboard() {
	const classes = useStyles();

	const {
		data: summary,
		isLoading,
		isError,
		error: responseError,
	} = useGetSummaryQuery();

	const {
		data: orders,
		isLoading: orderLoading,
		isError: orderError,
		error: orderResponseError,
	} = useGetOrdersQuery();

	const {
		data: staffs,
		isLoading: staffLoading,
		isError: staffError,
		error: staffResponseError,
	} = useGetStaffsQuery();

	const [staff, setStaff] = useState(null);
	const [editStaff, setEditStaff] = useState(false);

	const staffEditHandler = (staff) => {
		setStaff(staff);
		setEditStaff(true);
	};

	const modalCloseHandler = () => {
		setEditStaff(false);
		setStaff(null);
	};

	return isLoading || orderLoading ? (
		<Loader />
	) : (
		<Box>
			<Box mb={4}>
				{isError ? (
					<Alert severity="error">
						{responseError?.data?.detail || "Something went wrong!"}
					</Alert>
				) : (
					<>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} lg={3}>
								<Card className={classes.card}>
									<CardContent>
										<Typography variant="h3" align="center">
											{summary?.results?.pending_orders}
										</Typography>
									</CardContent>
									<CardActions className={classes.cardBottom}>
										<Typography variant="h5" align="center" mt={1}>
											Pending Orders
										</Typography>
									</CardActions>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<Card className={classes.card}>
									<CardContent>
										<Typography variant="h3" align="center">
											{summary?.results?.pending_reservations}
										</Typography>
									</CardContent>
									<CardActions className={classes.cardBottom}>
										<Typography variant="h5" align="center" mt={1}>
											Pending Reservations
										</Typography>
									</CardActions>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<Card className={classes.card}>
									<CardContent>
										<Typography variant="h3" align="center">
											{summary?.results?.registered_users}
										</Typography>
									</CardContent>
									<CardActions className={classes.cardBottom}>
										<Typography variant="h5" align="center" mt={1}>
											Active Clients
										</Typography>
									</CardActions>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<Card className={classes.card}>
									<CardContent>
										<Typography variant="h3" align="center">
											{summary?.results?.runnig_campaigns}
										</Typography>
									</CardContent>
									<CardActions className={classes.cardBottom}>
										<Typography variant="h5" align="center" mt={1}>
											Running Campaigns
										</Typography>
									</CardActions>
								</Card>
							</Grid>
						</Grid>
					</>
				)}
			</Box>

			<Divider />

			<Box mt={6}>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<Stack direction={"row"} justifyContent="space-between" mb={2}>
							<Typography variant="h4">Last 20 Order</Typography>
							<Button variant="outlined" color="primary">
								View All
							</Button>
						</Stack>

						{orderError ? (
							<Alert severity="error">
								{orderResponseError?.data?.detail || "Something went wrong!"}
							</Alert>
						) : (
							<OrderShortTable data={orders} />
						)}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Stack direction={"row"} justifyContent="space-between" mb={2}>
							<Typography variant="h4">Active Staffs</Typography>
						</Stack>
						<StaffTable data={staffs} staffEditHandler={staffEditHandler} />
					</Grid>
				</Grid>
			</Box>

			{/* Staff Edit Modal */}
			<Modal
				open={editStaff}
				title="Staff Details"
				closeModal={modalCloseHandler}
			>
				<StaffDetails data={staff} />
			</Modal>
		</Box>
	);
}
