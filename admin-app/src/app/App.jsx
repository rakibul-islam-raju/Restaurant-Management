import { Route, Routes } from "react-router-dom";
import Layout from "../components/global/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Dashboard />} />
			</Route>
		</Routes>
	);
}
