import {
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
import OrderTable from "../Orders/components/OrderTable";
import ReservationTable from "../Reservations/components/ReservationTable";

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

	return (
		<Box>
			<Box mb={4}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} lg={4}>
						<Card className={classes.card}>
							<CardContent>
								<Typography variant="h3" align="center">
									12
								</Typography>
							</CardContent>
							<CardActions className={classes.cardBottom}>
								<Typography variant="h5" align="center" mt={1}>
									Pending Orders
								</Typography>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} lg={4}>
						<Card className={classes.card}>
							<CardContent>
								<Typography variant="h3" align="center">
									12
								</Typography>
							</CardContent>
							<CardActions className={classes.cardBottom}>
								<Typography variant="h5" align="center" mt={1}>
									Pending Orders
								</Typography>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} lg={4}>
						<Card className={classes.card}>
							<CardContent>
								<Typography variant="h3" align="center">
									12
								</Typography>
							</CardContent>
							<CardActions className={classes.cardBottom}>
								<Typography variant="h5" align="center" mt={1}>
									Pending Orders
								</Typography>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Box>

			<Divider />

			<Box mt={6}>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<Stack direction={"row"} justifyContent="space-between" mb={2}>
							<Typography variant="h4" gutterBottom>
								Order
							</Typography>
							<Button variant="outlined" color="primary">
								View All
							</Button>
						</Stack>
						<OrderTable />
					</Grid>
					<Grid item xs={12} sm={6}>
						<Stack direction={"row"} justifyContent="space-between" mb={2}>
							<Typography variant="h4" gutterBottom>
								Reservations
							</Typography>
							<Button variant="outlined" color="primary">
								View All
							</Button>
						</Stack>
						<ReservationTable />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
