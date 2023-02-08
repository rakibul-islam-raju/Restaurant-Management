import { Divider, Typography } from "@mui/material";
import MenuTable from "./components/MenuTable";

export default function Menus() {
	return (
		<>
			<Typography variant="h4" gutterBottom>
				Menus
			</Typography>
			<Divider />
			<br />
			<MenuTable />
		</>
	);
}
