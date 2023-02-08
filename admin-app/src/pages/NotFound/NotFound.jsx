import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageNotFound from "../../assets/pageNotFound.svg";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<Stack direction={"row"} justifyContent="center" alignItems={"center"}>
			<Box width={6 / 12} textAlign={"center"}>
				<Typography variant="h2" gutterBottom align="center">
					Error 404
				</Typography>
				<Typography variant="body1" align="center" gutterBottom mb={4}>
					We can't find the page that you are looging for
				</Typography>
				<Button
					variant="contained"
					color="primary"
					size="large"
					onClick={() => navigate("/")}
				>
					Back to Home
				</Button>
			</Box>
			<Box width={6 / 12}>
				<img src={PageNotFound} alt="page not found" />
			</Box>
		</Stack>
	);
}
