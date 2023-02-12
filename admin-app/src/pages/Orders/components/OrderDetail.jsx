import {
	Alert,
	Box,
	Button,
	Divider,
	List,
	ListItem,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import {
	useEditOrderMutation,
	useGetOrderQuery,
} from "../../../features/orders/orderApi";

export default function OrderDetail({ orderId, closeModal, queryParams }) {
	const dispatch = useDispatch();

	const {
		data: order,
		isLoading,
		isError,
		error: responseError,
	} = useGetOrderQuery(orderId);

	const [
		editOrder,
		{
			isLoading: editLoading,
			isError: editError,
			error: editResponseError,
			isSuccess,
		},
	] = useEditOrderMutation();

	const updateOrder = (data) => {
		dispatch(editOrder({ data, params: queryParams, id: orderId }));
	};

	const togglePaid = () => {
		const confirmed = window.confirm("Are you sure ?");
		if (confirmed) {
			const data = { ...order, is_paid: !order.is_paid };
			updateOrder(data);
		}
	};

	const toggleServed = () => {
		const confirmed = window.confirm("Are you sure ?");
		if (confirmed) {
			const data = { ...order, is_served: !order.is_served };
			updateOrder(data);
		}
	};

	const toggleActive = () => {
		const confirmed = window.confirm("Are you sure ?");
		if (confirmed) {
			const data = { ...order, is_active: !order.is_active };
			updateOrder(data);
		}
	};

	useEffect(() => {
		if (isSuccess) closeModal();
	}, [isSuccess]);

	console.log("order =>", order);

	return isLoading ? (
		<Loader />
	) : (
		<Box>
			<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
				<Box>
					<Typography
						variant="h5"
						sx={{ textTransform: "capitalize" }}
					>{`${order?.user?.first_name} ${order?.user?.last_name}`}</Typography>
					<Typography variant="body1">{order?.user?.email}</Typography>
				</Box>
				<Stack direction={"row"} gap={1}>
					<Button
						variant="outlined"
						color={order?.is_paid ? "success" : "error"}
						size="small"
						onClick={togglePaid}
					>
						{order?.is_paid ? "Paid" : "Unpaid"}
					</Button>
					<Button
						variant="outlined"
						color={order?.is_served ? "success" : "error"}
						size="small"
						onClick={toggleServed}
					>
						{order?.is_served ? "Served" : "Not Served"}
					</Button>
					<Button
						variant="outlined"
						color={order?.is_active ? "success" : "error"}
						size="small"
						onClick={toggleActive}
					>
						{order?.is_active ? "Active" : "Canceled"}
					</Button>
				</Stack>
			</Stack>

			<Divider />

			<List>
				{order?.order_items?.length > 0 ? (
					order?.order_items?.map((item) => (
						<ListItem key={item.id}>
							<Stack
								direction={"row"}
								justifyContent="space-between"
								alignItems={"center"}
								width={"100%"}
							>
								<Box>
									<Typography variant="h6">
										{item.name} <small>x ({item.quantity})</small>
									</Typography>
									<Typography variant="body2">{item.price}</Typography>
								</Box>
								<Box>
									<Typography variant="h6">
										{item.quantity * item.price}
									</Typography>
								</Box>
							</Stack>
						</ListItem>
					))
				) : (
					<Alert severity="warning">No Items Found!</Alert>
				)}
			</List>
		</Box>
	);
}
