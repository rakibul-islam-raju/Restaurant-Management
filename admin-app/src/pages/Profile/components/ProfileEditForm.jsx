import { yupResolver } from "@hookform/resolvers/yup";
import CameraIcon from "@mui/icons-material/Camera";
import { Alert, Avatar, Box, Button, Stack, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useEditLoggedInUserMutation } from "../../../features/users/usersApi";
import { getFormData } from "../../../utils/getFormData";

const profileForm = yup
	.object({
		first_name: yup.string().required().min(4).max(100).label("First Name"),
		last_name: yup.string().required().min(4).max(100).label("Last Name"),
		email: yup.string().email().label("Email"),
		image: yup.mixed().required("Image is required").label("Image"),
	})
	.required();

export default function ProfileEditForm({ closeModal, edit, editData }) {
	const dispatch = useDispatch();

	const [
		editLoggedInUser,
		{ isLoading, isError, error: responseError, isSuccess },
	] = useEditLoggedInUserMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(profileForm),
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

			dispatch(editLoggedInUser({ data: formData, email: editData.email }));
		}
	};

	useEffect(() => {
		if (isSuccess) {
			closeModal();
			toast.success("Profile updated successfully");
		}
	}, [isSuccess]);

	return (
		<Box component={"form"} noValidate onSubmit={handleSubmit(onSubmit)}>
			{responseError?.data?.detail && (
				<Alert severity="error">
					{responseError?.data?.detail || "Something went wrong!"}
				</Alert>
			)}

			<Stack direction={"row"} justifyContent="center" mb={2}>
				<Avatar
					sx={{
						bgcolor: blue[500],
						width: 100,
						height: 100,
						position: "relative",
						width: 120,
						height: 120,
					}}
				>
					{previewImage ? (
						<img
							src={previewImage}
							alt={editData?.full_name}
							style={{ width: "100%" }}
						/>
					) : editData?.image ? (
						<img
							src={editData.image}
							alt={editData?.full_name}
							style={{ width: "100%" }}
						/>
					) : (
						<>
							{editData?.first_name?.charAt(0)}
							{editData?.last_name?.charAt(0)}
						</>
					)}

					<Button
						sx={{
							position: "absolute",
							bottom: 0,
							width: "100%",
							backgroundColor: "rgba(0,0,0,0.3)",
						}}
						component="label"
					>
						<CameraIcon htmlColor="#fff" />
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
				</Avatar>

				{/* {editData?.image ? (
					<Avatar
						alt={editData?.full_name}
						src={editData.image}
						sx={{ width: 100, height: 100 }}
					/>
				) : (
					<Avatar sx={{ bgcolor: blue[500], width: 100, height: 100 }}>
						{editData?.first_name?.charAt(0)}
						{editData?.last_name?.charAt(0)}
					</Avatar>
				)} */}
			</Stack>
			<Stack direction={"row"} gap={2}>
				<TextField
					variant="standard"
					margin="normal"
					required
					fullWidth
					label="First Name"
					defaultValue={edit ? editData.first_name : ""}
					{...register("first_name")}
					error={errors.first_name?.message || responseError?.data?.first_name}
					helperText={
						errors.first_name?.message || responseError?.data?.first_name
					}
				/>
				<TextField
					variant="standard"
					margin="normal"
					required
					fullWidth
					label="Last Name"
					defaultValue={edit ? editData.last_name : ""}
					{...register("last_name")}
					error={errors.last_name?.message || responseError?.data?.last_name}
					helperText={
						errors.last_name?.message || responseError?.data?.last_name
					}
				/>
			</Stack>
			<TextField
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="Email Address"
				defaultValue={edit ? editData.email : ""}
				{...register("email")}
				error={errors.email?.message || responseError?.data?.email}
				helperText={errors.email?.message || responseError?.data?.email}
			/>
			<Button
				variant="contained"
				type="submit"
				disabled={isLoading}
				fullWidth
				sx={{ mt: 4 }}
			>
				Save
			</Button>
		</Box>
	);
}
