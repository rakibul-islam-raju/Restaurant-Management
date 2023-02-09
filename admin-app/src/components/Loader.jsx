import { Box } from "@mui/material";
import bounchLoader from "../assets/bounchLoader.svg";

export default function Loader() {
	return (
		<Box
			display={"flex"}
			justifyContent="center"
			alignItems={"center"}
			height="100vh"
		>
			<img src={bounchLoader} alt="Loading..." />
		</Box>
	);
}
