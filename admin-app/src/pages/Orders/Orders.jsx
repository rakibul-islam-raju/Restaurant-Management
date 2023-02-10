import { Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { useGetOrdersQuery } from "../../features/orders/orderApi";
import OrderDetail from "./components/OrderDetail";
import OrderTable from "./components/OrderTable";

export default function Orders() {
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const [params, setParams] = useState("");
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);

	const {
		data: orders,
		isLoading,
		isError,
		error: responseError,
	} = useGetOrdersQuery(params);

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

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Orders
			</Typography>

			<Divider />
			<br />

			{isLoading ? (
				<Loader />
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
				<OrderDetail order={editData} />
			</Modal>
		</>
	);
}
