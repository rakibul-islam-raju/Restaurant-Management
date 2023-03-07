import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useChangePasswordMutation } from "../../../features/users/usersApi";

const passwordSchema = yup
	.object({
		old_password: yup.string().required().min(6).max(100).label("Old Password"),
		new_password: yup.string().required().min(6).max(100).label("New Password"),
		confirm_password: yup
			.string()
			.oneOf([yup.ref("new_password"), null], "Passwords must match"),
	})
	.required();

export default function PasswordChangeForm({ closeModal, toggoleContent }) {
	const dispatch = useDispatch();

	const [
		changePassword,
		{ isLoading, isError, error: responseError, isSuccess },
	] = useChangePasswordMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(passwordSchema),
	});

	const onSubmit = async (data) => {
		const newData = {
			old_password: data.old_password,
			new_password: data.new_password,
		};

		dispatch(changePassword(newData));
	};

	useEffect(() => {
		if (isSuccess) {
			closeModal();
			toast.success("Password Changed");
		}
	}, [isSuccess]);

	return (
		<Box component={"form"} noValidate onSubmit={handleSubmit(onSubmit)}>
			{responseError?.data?.detail && (
				<Alert severity="error">
					{responseError?.data?.detail || "Something went wrong!"}
				</Alert>
			)}

			<TextField
				type="password"
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="Old Password"
				{...register("old_password")}
				error={
					errors.old_password?.message || responseError?.data?.old_password
				}
				helperText={
					errors.old_password?.message || responseError?.data?.old_password
				}
			/>
			<TextField
				type="password"
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="New Password"
				{...register("new_password")}
				error={
					errors.new_password?.message || responseError?.data?.new_password
				}
				helperText={
					errors.new_password?.message || responseError?.data?.new_password
				}
			/>
			<TextField
				type="password"
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="Confirm Password"
				{...register("confirm_password")}
				error={
					errors.confirm_password?.message ||
					responseError?.data?.confirm_password
				}
				helperText={
					errors.confirm_password?.message ||
					responseError?.data?.confirm_password
				}
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
			<Box display={"flex"} justifyContent={"center"} mt={2}>
				<Button onClick={toggoleContent}>Edit Profile</Button>
			</Box>
		</Box>
	);
}
