import { Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import Loader from "../components/Loader";
import PublicLayout from "../components/PublicLayout";
import useAuthCheck from "../hooks/useAuthCheck";
import Categories from "../pages/categories/Categories";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Menus from "../pages/Menus/Menus";
import NotFound from "../pages/NotFound/NotFound";
import Orders from "../pages/Orders/Orders";
import Register from "../pages/Register/Register";

export default function App() {
	const authChecked = useAuthCheck();

	return !authChecked ? (
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
				<Route path="/menus" element={<Menus />} />
				<Route path="/categories" element={<Categories />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}
