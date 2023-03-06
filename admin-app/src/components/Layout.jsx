import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Menu, MenuItem, Stack } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { drawerWidth } from "../config/dashboardConfigs";
import { userLoggedOut } from "../features/auth/authSlice";
import { toggleLightMode } from "../features/theme/themeSlice";
import useAuth from "../hooks/useAuth";
import LeftSidebar, { DrawerHeader } from "./LeftSidebar";

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export default function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useAuth();

	const { lightMode } = useSelector((state) => state.theme);

	const [open, setOpen] = useState(true);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		dispatch(userLoggedOut());
		localStorage.removeItem("takeMyOrder_auth");
		setAnchorElUser(null);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return isLoggedIn ? (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
						Take My Order
					</Typography>
					<Stack direction={"row"} gap={4} alignItems={"center"}>
						<IconButton
							sx={{ p: 0 }}
							onClick={() => dispatch(toggleLightMode())}
						>
							{lightMode ? (
								<NightlightIcon style={{ color: "white" }} />
							) : (
								<WbSunnyIcon style={{ color: "white" }} />
							)}
						</IconButton>
						<Box>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<AccountCircle style={{ color: "white" }} />
							</IconButton>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={() => navigate("/profile")}>
									<AccountBoxOutlinedIcon sx={{ mr: 1 }} />
									<Typography textAlign="center">Profile</Typography>
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<LogoutIcon sx={{ mr: 1 }} />
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							</Menu>
						</Box>
					</Stack>
				</Toolbar>
			</AppBar>
			<>
				<LeftSidebar open={open} handleDrawerClose={handleDrawerClose} />
			</>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<>
					<Outlet />
				</>
			</Box>
		</Box>
	) : (
		<Navigate to="/login" replace />
	);
}
