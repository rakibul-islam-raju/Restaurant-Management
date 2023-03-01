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
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
	useAddChefMutation,
	useEditChefMutation,
} from "../../../features/chefs/chefApi";
import { getFormData } from "../../../utils/getFormData";

const chefSchema = yup
	.object({
		name: yup.string().required().min(4).max(100).label("Name"),
		short_description: yup
			.string()
			.required()
			.min(6)
			.max(255)
			.max(100)
			.label("Short Description"),
		image: yup.mixed().required("Image is required").label("Image"),
		is_active: yup.boolean().optional().label("Active Status"),
	})
	.required();

export default function ChefForm({ closeModal, queryParams, edit, editData }) {
	const dispatch = useDispatch();

	const [addChef, { isLoading, isError, error: responseError, isSuccess }] =
		useAddChefMutation();

	const [
		editChef,
		{
			isLoading: editLoading,
			isSuccess: editSuccess,
			error: editResponseError,
		},
	] = useEditChefMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(chefSchema),
	});

	const [image, setImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);

	const onSubmit = async (data) => {
		if (edit && editData.id) {
			const newData = { ...data };
			if (image) {
				newData.image = image;
			} else {
				delete newData.image;
			}
			const formData = getFormData(newData);

			dispatch(
				editChef({ data: formData, params: queryParams, id: editData.id })
			);
		} else {
			const newData = { ...data, image };
			const formData = getFormData(newData);
			dispatch(addChef({ data: formData, params: queryParams }));
		}
	};

	useEffect(() => {
		if (isSuccess || editSuccess) {
			closeModal();

			if (edit) {
				toast.success("Chef updated successfully");
			} else {
				toast.success("Chef added successfully");
			}
		}
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
				label="Chef Name"
				defaultValue={edit ? editData.name : ""}
				{...register("name")}
				error={errors.name?.message || responseError?.data?.name}
				helperText={errors.name?.message || responseError?.data?.name}
			/>
			<TextField
				multiline
				rows={3}
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="Short Description"
				defaultValue={edit ? editData.short_description : ""}
				{...register("short_description")}
				error={
					errors.short_description?.message ||
					responseError?.data?.short_description
				}
				helperText={
					errors.short_description?.message ||
					responseError?.data?.short_description
				}
			/>

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
