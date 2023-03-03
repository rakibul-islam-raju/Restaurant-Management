import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	Alert,
	Box,
	Grid,
	IconButton,
	InputAdornment,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useLoginMutation } from "../../../features/auth/authApi";

const loginSchema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required().min(4).max(100),
	})
	.required();

export default function LoginForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { data, isLoading, isSuccess, isError, error: responseError }] =
		useLoginMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const onSubmit = (data) => {
		dispatch(login(data));
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
			sx={{ mt: 1 }}
		>
			{responseError?.data?.detail && (
				<Alert severity="error">{responseError?.data?.detail}</Alert>
			)}

			<TextField
				data-testid="email"
				variant="standard"
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				autoComplete="email"
				{...register("email")}
				autoFocus
				error={errors.email?.message || responseError?.data?.email}
				helperText={errors.email?.message || responseError?.data?.email}
			/>
			<TextField
				data-testid="password"
				variant="standard"
				margin="normal"
				required
				fullWidth
				id="password"
				label="Password"
				type={showPassword ? "text" : "password"}
				autoComplete="current-password"
				{...register("password")}
				error={errors.password?.message || responseError?.data?.password}
				helperText={errors.password?.message || responseError?.data?.password}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Button
				disabled={isLoading}
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Sign In
			</Button>
			<Grid container justifyContent={"center"}>
				<Grid item>
					<Link to="/register">
						<Typography color="primary">
							Don't have an account? Sign Up
						</Typography>
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
}
