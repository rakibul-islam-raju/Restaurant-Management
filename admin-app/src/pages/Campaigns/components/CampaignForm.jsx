import { yupResolver } from "@hookform/resolvers/yup";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
	Alert,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
	useAddCampaignMutation,
	useEditCampaignMutation,
} from "../../../features/campaign/campaignApi";
import { getFormData } from "../../../utils/getFormData";

const campaignSchema = yup
	.object({
		title: yup.string().required().max(100),
		description: yup.string(),
		start_date: yup.date(),
		end_date: yup.date(),
		image: yup.mixed().required("Image is required"),
		is_active: yup.boolean().optional(),
	})
	.required();

export default function CampaignForm({
	closeModal,
	queryParams,
	edit,
	editData,
}) {
	const dispatch = useDispatch();

	const [startDate, setStartDate] = useState(
		moment(new Date()).format("YYYY-MM-DD")
	);
	const [endDate, setEndDate] = useState(
		moment(new Date()).format("YYYY-MM-DD")
	);
	const [image, setImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);

	const [addCampaign, { isLoading, isError, error: responseError, isSuccess }] =
		useAddCampaignMutation();

	const [
		editCampaign,
		{
			isLoading: editLoading,
			isSuccess: editSuccess,
			error: editResponseError,
		},
	] = useEditCampaignMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(campaignSchema),
	});

	const onSubmit = (data) => {
		console.log("submit =>", data);
		const newData = { ...data };

		// handle image
		if (image) {
			newData.image = image;
		} else {
			delete newData.image;
		}

		// handle dates
		if (startDate) {
			newData.start_date = moment(startDate).format("YYYY-MM-DD");
		}
		if (endDate) {
			newData.end_date = moment(endDate).format("YYYY-MM-DD");
		}

		// convert into formData
		const formData = getFormData(newData);

		if (edit && editData.id) {
			dispatch(
				editCampaign({ data: formData, params: queryParams, id: editData.id })
			);
		} else {
			dispatch(addCampaign({ data: formData, params: queryParams }));
		}
	};

	useEffect(() => {
		if (isSuccess || editSuccess) closeModal();
	}, [isSuccess, editSuccess]);

	return (
		<Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
			{(responseError?.data?.detail || editResponseError?.data?.detail) && (
				<Alert severity="error">
					{responseError?.data?.detail ||
						editResponseError.data?.detail ||
						"Something went wrong!"}
				</Alert>
			)}

			<TextField
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="Campaign Title"
				defaultValue={edit ? editData.title : ""}
				{...register("title")}
				error={errors.title?.message || responseError?.data?.title}
				helperText={errors.title?.message || responseError?.data?.title}
			/>
			<TextField
				multiline
				rows={5}
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="Description"
				defaultValue={edit ? editData.description : ""}
				{...register("description")}
				error={errors.description?.message || responseError?.data?.description}
				helperText={
					errors.description?.message || responseError?.data?.description
				}
			/>
			<Stack direction={"row"} gap={2}>
				<DatePicker
					label="Start Date"
					{...register("start_date")}
					onChange={(newValue) => {
						setStartDate(newValue);
					}}
					inputFormat="yyyy-MM-DD"
					value={startDate}
					renderInput={(params) => (
						<TextField
							variant="standard"
							type="date"
							margin="normal"
							required
							fullWidth
							error={
								errors.start_date?.message || responseError?.data?.start_date
							}
							helperText={
								errors.start_date?.message || responseError?.data?.start_date
							}
							{...params}
						/>
					)}
				/>
				<DatePicker
					label="End Date"
					{...register("end_date")}
					onChange={(newValue) => {
						setEndDate(newValue);
					}}
					inputFormat="yyyy-MM-DD"
					value={endDate}
					renderInput={(params) => (
						<TextField
							variant="standard"
							type="date"
							margin="normal"
							required
							fullWidth
							error={errors.end_date?.message || responseError?.data?.end_date}
							helperText={
								errors.end_date?.message || responseError?.data?.end_date
							}
							{...params}
						/>
					)}
				/>
			</Stack>

			<Box mt={2}>
				{(previewImage || editData?.image) && (
					<img
						style={{ width: "100%", marginBottom: "5px" }}
						src={previewImage ? previewImage : editData?.image}
						alt="image preview"
					/>
				)}

				<Button variant="contained" fullWidth color="primary" component="label">
					<CameraAltIcon sx={{ mr: 2 }} />
					Upload Image
					<input
						{...register("image")}
						onChange={(e) => {
							setImage(e.target.files[0]);
							setPreviewImage(URL.createObjectURL(e.target.files[0]));
						}}
						type="file"
						multiple
						accept="image/*"
						hidden
					/>
				</Button>

				{(errors?.image?.message || responseError?.data?.image) && (
					<Typography color="error">
						{errors?.image?.message || responseError?.data?.image}
					</Typography>
				)}
			</Box>

			{edit && (
				<FormControlLabel
					control={
						<Checkbox
							{...register("is_active")}
							defaultChecked={editData.is_active}
							color="primary"
						/>
					}
					label="Active Status"
				/>
			)}

			<Stack direction={"row"} justifyContent="end" gap={2} mt={3}>
				<Button
					disabled={isLoading || editLoading}
					type="button"
					color="inherit"
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					disabled={isLoading || editLoading}
					type="submit"
					color="primary"
				>
					Submit
				</Button>
			</Stack>
		</Box>
	);
}
