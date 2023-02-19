import { createTheme } from "@mui/material";
import { blue, green, yellow } from "@mui/material/colors";
import { ThemeProvider } from "@mui/styles";

import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import PublicLayout from "../components/PublicLayout";
import useAuthCheck from "../hooks/useAuthCheck";
import Campaigns from "../pages/Campaigns/Campaigns";
import Categories from "../pages/categories/Categories";
import Contacts from "../pages/Contacts/Contacts";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Menus from "../pages/Menus/Menus";
import NotFound from "../pages/NotFound/NotFound";
import Orders from "../pages/Orders/Orders";
import Register from "../pages/Register/Register";
import Reservations from "../pages/Reservations/Reservations";
import UserOrders from "../pages/Users/UserOrders";
import Users from "../pages/Users/Users";

export default function App() {
	const authChecked = useAuthCheck();

	const theme = createTheme({
		palette: {
			primary: {
				main: blue[500],
				light: blue[400],
				dark: blue[600],
			},
			success: {
				main: green[500],
				light: green[400],
				dark: green[600],
			},
			warning: {
				main: yellow[500],
				light: yellow[400],
				dark: yellow[600],
			},
			gray: {
				main: "#6b7280",
				light: "#9ca3af",
				dark: "#4b5563",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			{!authChecked ? (
				<Loader />
			) : (
				<Routes>
					{/* public route */}
					<Route element={<PublicLayout />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>

					{/* private route */}
					<Route element={<Layout />}>
						<Route index element={<Dashboard />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/orders/user/:userId" element={<UserOrders />} />
						<Route path="/menus" element={<Menus />} />
						<Route path="/categories" element={<Categories />} />
						<Route path="/reservations" element={<Reservations />} />
						<Route path="/campaigns" element={<Campaigns />} />
						<Route path="/contacts" element={<Contacts />} />
						<Route path="/users" element={<Users />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			)}
		</ThemeProvider>
	);
}
