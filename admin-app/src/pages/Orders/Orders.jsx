import { Alert, Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../../components/CustomDrawer";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { useLazyGetOrdersQuery } from "../../features/orders/orderApi";
import FilterList from "./components/FilterList";
import OrderDetail from "./components/OrderDetail";
import OrderTable from "./components/OrderTable";

export default function Orders() {
	const dispatch = useDispatch();
	const { filters, filterApplied } = useSelector((state) => state.order);

	const [openModal, setOpenModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);
	const [applyFilter, setApplyFilter] = useState(true);

	const [trigger, { data: orders, isLoading, isError, error: responseError }] =
		useLazyGetOrdersQuery();

	const closeModal = () => {
		setOpenModal(false);
		setEdit(false);
		setEditData(null);
	};

	const editMenuHandler = (data) => {
		setEdit(true);
		setEditData(data);
		setOpenModal(true);
	};

	const filterSubmitHandler = () => setApplyFilter(true);

	useEffect(() => {
		if (applyFilter) {
			const params = { ...filters };
			if (filters?.user__email === "") delete params.user__email;
			if (filters?.is_paid === "") delete params.is_paid;
			if (filters?.is_served === "") delete params.is_served;
			if (filters?.is_active === "") delete params.is_active;

			trigger(params);
			setApplyFilter(false);
		}
	}, [applyFilter]);

	return (
		<>
			<Stack direction={"row"} justifyContent={"space-between"}>
				<Typography variant="h4" gutterBottom>
					Orders
				</Typography>
				<Box>
					<CustomDrawer
						drawerComponent={
							<FilterList submitButtonHandler={filterSubmitHandler} />
						}
						buttonText="Filter"
						anchor="right"
						buttonVariant="contained"
					/>
				</Box>
			</Stack>

			<Divider />
			<br />

			{isLoading ? (
				<Loader />
			) : isError ? (
				<Alert severity="error">
					{responseError?.data?.detail || "Something went wrong!"}
				</Alert>
			) : (
				<OrderTable data={orders} editMenuHandler={editMenuHandler} />
			)}

			{/* modal */}
			<Modal
				open={openModal}
				closeModal={closeModal}
				title="Order Details"
				size="md"
			>
				<OrderDetail
					orderId={editData?.id}
					closeModal={closeModal}
					queryParams={filters}
				/>
			</Modal>
		</>
	);
}
