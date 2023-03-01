import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as ThemeProviderLegacy } from "@mui/styles";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import PublicLayout from "../components/PublicLayout";
import useAuthCheck from "../hooks/useAuthCheck";
import Campaigns from "../pages/Campaigns/Campaigns";
import Categories from "../pages/categories/Categories";
import Chefs from "../pages/Chefs/Chefs";
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
	const { lightMode } = useSelector((state) => state.theme);

	const theme = createTheme({
		palette: {
			mode: lightMode ? "light" : "dark",
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<ThemeProviderLegacy theme={theme}>
				<CssBaseline />
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
							<Route path="/chefs" element={<Chefs />} />
							<Route path="/contacts" element={<Contacts />} />
							<Route path="/users" element={<Users />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				)}
			</ThemeProviderLegacy>
		</ThemeProvider>
	);
}
