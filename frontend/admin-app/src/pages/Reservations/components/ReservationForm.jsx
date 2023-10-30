import { yupResolver } from "@hookform/resolvers/yup";
import {
	Alert,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	MenuItem,
	Stack,
	TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
	useAddReservationMutation,
	useEditReservationMutation,
} from "../../../features/reservation/reservationApi";

const reservationSchema = yup.object({
	name: yup.string().optional().min(4).max(100),
	email: yup.string().email().optional(),
	person: yup.number().optional().min(2).max(12),
	phone: yup.string().min(11).max(11).optional(),
	time: yup.string().optional(),
	date: yup.date().optional(),
	status: yup.string().optional(),
	is_active: yup.boolean().optional(),
});

const RESERVATION_STATUS = ["pending", "confirmed", "cancelled"];

export default function ReservationForm({
	closeModal,
	queryParams,
	edit,
	editData,
}) {
	const dispatch = useDispatch();

	const [reservationData, setReservationData] = useState({});
	const [date, setDate] = useState(editData?.date);

	const [
		editReservation,
		{
			isLoading: editLoading,
			isSuccess: editSuccess,
			error: editResponseError,
		},
	] = useEditReservationMutation();
	const [
		addReservation,
		{ isLoading: addLoading, isSuccess: addSuccess, error: addResponseError },
	] = useAddReservationMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(reservationSchema),
	});

	const onSubmit = (data) => {
		const newData = { ...reservationData };
		if (date) {
			newData.date = moment(date).format("YYYY-MM-DD");
		}

		if (edit) {
			dispatch(
				editReservation({
					data: newData,
					params: queryParams,
					id: editData.id,
				})
			);
		} else {
			dispatch(
				addReservation({
					data: newData,
				})
			);
		}
	};

	const onChangeHandler = (e) => {
		setReservationData({ ...reservationData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (editSuccess) {
			toast.success("Reservation Updated!");
			closeModal();
		}
		if (addSuccess) {
			toast.success("Reservation Created!");
			closeModal();
		}
	}, [editSuccess, addSuccess]);

	return (
		<Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
			{editResponseError?.data?.detail && (
				<Alert severity="error">
					{editResponseError.data?.detail || "Something went wrong!"}
				</Alert>
			)}

			<Stack direction={"row"} gap={2}>
				<TextField
					variant="standard"
					margin="normal"
					fullWidth
					label="Name"
					defaultValue={editData?.name}
					{...register("name")}
					error={errors.name?.message || addResponseError?.data?.name}
					helperText={errors.name?.message || addResponseError?.data?.name}
					disabled={edit}
					onChange={onChangeHandler}
				/>
				<TextField
					variant="standard"
					margin="normal"
					fullWidth
					label="Email"
					defaultValue={editData?.user?.email}
					{...register("email")}
					error={errors.email?.message || addResponseError?.data?.email}
					helperText={errors.email?.message || addResponseError?.data?.email}
					disabled={edit}
					onChange={onChangeHandler}
				/>
				<TextField
					type={"tel"}
					variant="standard"
					margin="normal"
					fullWidth
					label="Phone"
					defaultValue={editData?.phone}
					{...register("phone")}
					error={errors.phone?.message || addResponseError?.data?.phone}
					helperText={errors.phone?.message || addResponseError?.data?.phone}
					disabled={edit}
					onChange={onChangeHandler}
				/>
			</Stack>

			<Stack direction={"row"} gap={2}>
				<TextField
					variant="standard"
					type="number"
					margin="normal"
					required
					fullWidth
					label="Person"
					defaultValue={editData?.person}
					{...register("person")}
					error={
						errors.person?.message ||
						addResponseError?.data?.person ||
						editResponseError?.data?.person
					}
					helperText={
						errors.person?.message ||
						addResponseError?.data?.person ||
						editResponseError?.data?.person
					}
					onChange={onChangeHandler}
				/>
				<TextField
					type={"time"}
					variant="standard"
					margin="normal"
					required
					fullWidth
					label="Time"
					defaultValue={editData?.time}
					{...register("time")}
					error={
						errors.time?.message ||
						addResponseError?.data?.time ||
						editResponseError?.data?.time
					}
					helperText={
						errors.time?.message ||
						addResponseError?.data?.time ||
						editResponseError?.data?.time
					}
					onChange={onChangeHandler}
				/>
				<DatePicker
					label="Date"
					{...register("date")}
					onChange={(newValue) => {
						setDate(newValue);
					}}
					value={date}
					renderInput={(params) => (
						<TextField
							variant="standard"
							type="date"
							margin="normal"
							required
							fullWidth
							error={
								errors.date?.message ||
								addResponseError?.data?.date ||
								editResponseError?.data?.date
							}
							helperText={
								errors.date?.message ||
								addResponseError?.data?.date ||
								editResponseError?.data?.date
							}
							{...params}
						/>
					)}
				/>
				<TextField
					select
					variant="standard"
					margin="normal"
					required
					fullWidth
					label="status"
					defaultValue={editData?.status}
					{...register("status")}
					error={
						errors.status?.message ||
						addResponseError?.data?.status ||
						editResponseError?.data?.status
					}
					helperText={
						errors.status?.message ||
						addResponseError?.data?.status ||
						editResponseError?.data?.status
					}
					onChange={onChangeHandler}
				>
					{RESERVATION_STATUS.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
			</Stack>

			{edit && (
				<FormControlLabel
					control={
						<Checkbox
							defaultChecked={editData.is_active}
							{...register("is_active")}
							onChange={(e) => {
								onChangeHandler({
									target: {
										name: e.target.name,
										value: e.target.checked,
									},
								});
							}}
							color="primary"
						/>
					}
					label="Active Status"
				/>
			)}

			<Stack direction={"row"} justifyContent="end" gap={2} mt={3}>
				<Button
					disabled={editLoading}
					type="button"
					color="inherit"
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					disabled={editLoading || addLoading}
					type="submit"
					color="primary"
				>
					Submit
				</Button>
			</Stack>
		</Box>
	);
}
