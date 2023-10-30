import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { blue } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { useGetLoggedInUserQuery } from "../../features/users/usersApi";
import PasswordChangeForm from "./components/PasswordChangeForm";
import ProfileEditForm from "./components/ProfileEditForm";

const useStyles = makeStyles((theme) => ({
	root: {},
}));

export default function Profile() {
	const classes = useStyles();
	const { user } = useSelector((state) => state.auth);

	const [editModal, setEditModal] = useState(false);
	const [passwordForm, setPasswordForm] = useState(false);

	const toggoleContent = () => setPasswordForm((prevState) => !prevState);

	const hideEditModal = () => {
		setEditModal(false);
		setPasswordForm(false);
	};

	const {
		data,
		isLoading,
		isError,
		error: responseError,
	} = useGetLoggedInUserQuery(user?.email);

	return isLoading ? (
		<Loader />
	) : isError ? (
		<Alert severity="error">
			{responseError.status} {JSON.stringify(responseError.data)}
		</Alert>
	) : (
		<Box className={classes.root}>
			<Grid container spacing={{ xs: 2, md: 4 }}>
				<Grid item xs={12} md={8}>
					<Card>
						<CardContent>
							<Box display={"flex"} justifyContent={"flex-end"}>
								<Chip
									label={
										data?.is_superuser
											? "Super Admin"
											: data?.is_superuser && "Staff"
									}
									color="success"
								/>
							</Box>
							<Stack direction={"row"} justifyContent="center" mb={2}>
								{data?.image ? (
									<Avatar
										alt={data?.full_name}
										src={data.image}
										sx={{ width: 100, height: 100 }}
									/>
								) : (
									<Avatar sx={{ bgcolor: blue[500], width: 100, height: 100 }}>
										{data?.first_name?.charAt(0)}
										{data?.last_name?.charAt(0)}
									</Avatar>
								)}
							</Stack>
							<Typography variant="h4" align="center">
								{data?.full_name}
							</Typography>
							<Typography variant="body1" align="center">
								{data?.email}
							</Typography>
							<Box mt={3} display={"flex"} justifyContent={"center"}>
								<Button
									variant="outlined"
									size="small"
									type="button"
									onClick={() => setEditModal(true)}
								>
									Edit Profile
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4}>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Date Joined</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								{new Date(data?.date_joined).toLocaleString()}
							</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2a-content"
							id="panel2a-header"
						>
							<Typography>Last Login</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								{new Date(data?.last_login).toLocaleString()}
							</Typography>
						</AccordionDetails>
					</Accordion>
				</Grid>
			</Grid>

			{/* edit form modal */}
			{editModal && (
				<Modal
					title={passwordForm ? "Change Password" : "Edit Profile"}
					open={editModal}
					closeModal={hideEditModal}
				>
					{passwordForm ? (
						<PasswordChangeForm
							toggoleContent={toggoleContent}
							closeModal={hideEditModal}
						/>
					) : (
						<ProfileEditForm
							closeModal={hideEditModal}
							edit
							editData={data}
							toggoleContent={toggoleContent}
						/>
					)}
				</Modal>
			)}
		</Box>
	);
}
