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
import * as yup from "yup";
import { useEditReservationMutation } from "../../../features/reservation/reservationApi";

const reservationSchema = yup.object({
	person: yup.number().optional().min(2).max(12),
	time: yup.string().optional(),
	date: yup.date().optional(),
	status: yup.string().optional(),
	is_active: yup.boolean().optional(),
});

const RESERVATION_TIME_SLOT = ["12pm - 2pm", "2pm - 4pm"];
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

		dispatch(
			editReservation({
				data: newData,
				params: queryParams,
				id: editData.id,
			})
		);
	};

	const onChangeHandler = (e) => {
		setReservationData({ ...reservationData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (editSuccess) closeModal();
	}, [editSuccess]);

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
					value={editData?.name}
					disabled
				/>
				<TextField
					variant="standard"
					margin="normal"
					fullWidth
					label="Email"
					value={editData?.user?.email}
					disabled
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
					onChange={onChangeHandler}
				/>
				<TextField
					select
					variant="standard"
					margin="normal"
					required
					fullWidth
					label="Time"
					defaultValue={editData?.time}
					{...register("time")}
					onChange={onChangeHandler}
				>
					{RESERVATION_TIME_SLOT.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
				<DatePicker
					label="Date"
					{...register("date")}
					onChange={(newValue) => {
						setDate(newValue);
					}}
					inputFormat="yyyy-MM-DD"
					value={date}
					renderInput={(params) => (
						<TextField
							variant="standard"
							type="date"
							margin="normal"
							required
							fullWidth
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
				<Button disabled={editLoading} type="submit" color="primary">
					Submit
				</Button>
			</Stack>
		</Box>
	);
}
