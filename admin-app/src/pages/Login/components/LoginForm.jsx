import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
	Box,
	Grid,
	IconButton,
	InputAdornment,
	Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	return (
		<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
			<TextField
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type={showPassword ? "text" : "password"}
				id="password"
				autoComplete="current-password"
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
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
