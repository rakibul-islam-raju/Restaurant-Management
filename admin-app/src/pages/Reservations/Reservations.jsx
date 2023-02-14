import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import {
	useDeleteReservationMutation,
	useGetReservationsQuery,
} from "../../features/reservation/reservationApi";
import ReservationForm from "./components/ReservationForm";
import ReservationTable from "./components/ReservationTable";

export default function Reservations() {
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const [params, setParams] = useState("");
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);

	const {
		data: resarvations,
		isLoading,
		isError,
		error: responseError,
	} = useGetReservationsQuery(params);

	const [
		deleteReservation,
		{ isSuccess: deleteSuccess, error: deleteResponseError },
	] = useDeleteReservationMutation();

	const closeModal = () => {
		setOpenModal(false);
		setEdit(false);
		setEditData(null);
	};

	const editResarvationHandler = (data) => {
		setEdit(true);
		setEditData(data);
		setOpenModal(true);
	};

	const deleteHandler = (id) => {
		const res = window.confirm("Do you want to delete this item?");
		if (res) {
			dispatch(deleteReservation({ id, params }));
		}
	};

	return (
		<>
			<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
				<Typography variant="h4" gutterBottom>
					Reservations
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpenModal(true)}
				>
					Add Reservation
				</Button>
			</Stack>
			<Divider />
			<br />

			{isLoading ? (
				<Loader />
			) : isError ? (
				<Alert severity="error">
					{responseError?.data?.detail ||
						deleteResponseError?.data?.detail ||
						"Something went wrong!"}
				</Alert>
			) : (
				<ReservationTable
					data={resarvations}
					editResarvationHandler={editResarvationHandler}
					deleteHandler={deleteHandler}
				/>
			)}

			{/* modal */}
			<Modal
				open={openModal}
				closeModal={closeModal}
				title={`${edit ? "Edit Reservation" : "Add New Reservation"}`}
				size="md"
			>
				<ReservationForm
					closeModal={closeModal}
					queryParams={params}
					edit={edit}
					editData={editData}
				/>
			</Modal>
		</>
	);
}
