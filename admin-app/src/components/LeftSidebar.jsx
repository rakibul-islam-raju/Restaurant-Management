import CampaignIcon from "@mui/icons-material/Campaign";
import CategoryIcon from "@mui/icons-material/Category";
import ChairIcon from "@mui/icons-material/Chair";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import { Divider, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { drawerWidth } from "../config/dashboardConfigs";

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const MENUS = [
	{
		id: 1,
		text: "Orders",
		path: "/orders",
		icon: <TakeoutDiningIcon color="primary" />,
	},
	{
		id: 2,
		text: "Reservations",
		path: "/reservations",
		icon: <ChairIcon color="primary" />,
	},
	{
		id: 3,
		text: "Menus",
		path: "/menus",
		icon: <FastfoodIcon color="primary" />,
	},
	{
		id: 4,
		text: "Categories",
		path: "/categories",
		icon: <CategoryIcon color="primary" />,
	},
	{
		id: 5,
		text: "Campaigns",
		path: "/campaigns",
		icon: <CampaignIcon color="primary" />,
	},
];

export default function LeftSidebar({ open, handleDrawerClose }) {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Drawer variant="permanent" open={open}>
			<DrawerHeader>
				<Typography component={Link} to="/" variant="h6">
					Dashboard
				</Typography>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "rtl" ? (
						<ChevronRightIcon color="primary" />
					) : (
						<ChevronLeftIcon color="primary" />
					)}
				</IconButton>
			</DrawerHeader>
			<Divider />

			<List>
				{MENUS.map((menu, index) => (
					<ListItem key={menu.id} disablePadding sx={{ display: "block" }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
							onClick={() => navigate(`${menu.path}`)}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{menu.icon}
							</ListItemIcon>
							<ListItemText
								primary={menu.text}
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}
