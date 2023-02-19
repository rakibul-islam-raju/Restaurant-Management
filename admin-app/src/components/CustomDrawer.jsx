import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import { DrawerHeader } from "./LeftSidebar";

export default function CustomDrawer({
	drawerComponent,
	anchor = "right",
	buttonText = "right",
	buttonVariant = "text",
	drawerWidth = 400,
}) {
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const renderComponent = (anchor) => (
		<Box
			sx={{
				width: anchor === "top" || anchor === "bottom" ? "auto" : drawerWidth,
			}}
			role="presentation"
			// onClick={toggleDrawer(anchor, false)}
			// onKeyDown={toggleDrawer(anchor, false)}
		>
			{drawerComponent}
		</Box>
	);

	return (
		<Box>
			<Button variant={buttonVariant} onClick={toggleDrawer("right", true)}>
				{buttonText}
			</Button>
			<Drawer
				anchor={anchor}
				open={state[anchor]}
				onClose={toggleDrawer(anchor, false)}
			>
				<DrawerHeader />
				{renderComponent(anchor)}
			</Drawer>
		</Box>
	);
}
