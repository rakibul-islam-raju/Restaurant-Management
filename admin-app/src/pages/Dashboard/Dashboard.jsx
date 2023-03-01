import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { useGetOrdersQuery } from "../../features/orders/orderApi";
import { useGetSummaryQuery } from "../../features/statistics/statisticsApi";
import { useGetStaffsQuery } from "../../features/users/usersApi";
import OrderShortTable from "./components/OrderShortTable";
import StaffDetails from "./components/StaffDetails";
import StaffTable from "./components/StaffTable";

const useStyles = makeStyles((theme) => ({
	card: () => ({
		backgroundColor: theme.palette.primary.main,
		textAlign: "center",
		color: "white",
	}),
	cardContent: () => ({
		display: "flex",
		justifyContent: "space-between",
	}),
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
									<CardContent className={classes.cardContent}>
										<Typography variant="h5">Pending Orders</Typography>
										<Typography variant="h3">
											{summary?.results?.pending_orders}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<Card className={classes.card}>
									<CardContent className={classes.cardContent}>
										<Typography variant="h5">Pending Reservations</Typography>
										<Typography variant="h3">
											{summary?.results?.pending_reservations}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<Card className={classes.card}>
									<CardContent className={classes.cardContent}>
										<Typography variant="h5">Active Clients</Typography>
										<Typography variant="h3">
											{summary?.results?.registered_users}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<Card className={classes.card}>
									<CardContent className={classes.cardContent}>
										<Typography variant="h5">Running Campaigns</Typography>
										<Typography variant="h3">
											{summary?.results?.runnig_campaigns}
										</Typography>
									</CardContent>
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
							<Typography variant="h4">Recent Orders</Typography>
							<Button
								component={Link}
								to="/orders"
								variant="outlined"
								color="primary"
							>
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
							<Typography variant="h4">Staffs</Typography>
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
