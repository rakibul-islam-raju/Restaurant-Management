import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { useGetOrdersQuery } from "../../features/orders/orderApi";
import OrderDetail from "../Orders/components/OrderDetail";
import OrderTable from "../Orders/components/OrderTable";

export default function UserOrders() {
	const navigate = useNavigate();
	const {
		state: { user },
	} = useLocation();

	const [openModal, setOpenModal] = useState(false);
	const [params, setParams] = useState("");
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);

	const {
		data: orders,
		isLoading,
		isError,
		error: responseError,
	} = useGetOrdersQuery(
		{ user__email: user?.email },
		{
			refetchOnFocus: true,
			refetchOnReconnect: true,
			refetchOnMountOrArgChange: true,
		}
	);

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
			<Stack direction={"row"} justifyContent={"space-between"}>
				<Box>
					<Button
						variant="outlined"
						color="info"
						sx={{ mb: 1 }}
						onClick={() => navigate(-1)}
					>
						<KeyboardArrowLeftIcon />
					</Button>
					<Typography variant="h4">Order History</Typography>
				</Box>

				<Box>
					<Typography
						variant="h3"
						align="right"
						sx={{ textTransform: "capitalize" }}
					>{`${user?.first_name} ${user?.last_name}`}</Typography>
					<Typography
						align="right"
						variant="body1"
						gutterBottom
					>{`${user?.email}`}</Typography>
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
					queryParams={params}
				/>
			</Modal>
		</>
	);
}
