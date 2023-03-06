import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import bounchLoader from "../assets/bounchLoader.svg";

const useStyles = makeStyles((theme) => ({
	root: () => ({
		position: "fixed",
		top: 0,
		left: 0,
		height: "100vh",
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.2)",
	}),
	loadingContainer: () => ({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		width: "100%",
	}),
}));

export default function Loader() {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Box className={classes.loadingContainer}>
				<img src={bounchLoader} alt="Loading..." />
			</Box>
		</Box>
	);
}
