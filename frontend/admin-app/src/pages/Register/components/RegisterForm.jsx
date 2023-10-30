import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useRegistrationMutation } from "../../../features/auth/authApi";

const registerSchema = yup.object({
	first_name: yup.string().required().min(3).max(100),
	last_name: yup.string().required().min(3).max(100),
	email: yup.string().email().required(),
	password: yup.string().required().min(4).max(100),
});

export default function RegisterForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [registration, { data, isLoading, isSuccess, error: responseError }] =
		useRegistrationMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = (data) => {
		dispatch(registration(data));
	};

	useEffect(() => {
		if (isSuccess) {
			navigate("/");
		}
	}, [isSuccess]);

	return (
		<Box
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{ mt: 3 }}
		>
			{responseError?.data?.detail && (
				<Alert severity="error">{responseError?.data?.detail}</Alert>
			)}

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						variant="standard"
						required
						fullWidth
						autoFocus
						label="First Name"
						type="text"
						{...register("first_name")}
						error={
							errors.first_name?.message || responseError?.data?.first_name
						}
						helperText={
							errors.first_name?.message || responseError?.data?.first_name
						}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						variant="standard"
						required
						fullWidth
						label="Last Name"
						type="text"
						{...register("last_name")}
						error={errors.last_name?.message || responseError?.data?.last_name}
						helperText={
							errors.last_name?.message || responseError?.data?.last_name
						}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="standard"
						required
						fullWidth
						label="Email Address"
						type="email"
						{...register("email")}
						error={errors.email?.message || responseError?.data?.email}
						helperText={errors.email?.message || responseError?.data?.email}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="standard"
						required
						fullWidth
						label="Password"
						type="password"
						{...register("password")}
						error={errors.password?.message || responseError?.data?.password}
						helperText={
							errors.password?.message || responseError?.data?.password
						}
					/>
				</Grid>
			</Grid>
			<Button
				disabled={isLoading}
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Sign Up
			</Button>
			<Grid container justifyContent="center">
				<Grid item>
					<Link to="/login">
						<Typography color="primary">
							Already have an account? Sign in
						</Typography>
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
}
