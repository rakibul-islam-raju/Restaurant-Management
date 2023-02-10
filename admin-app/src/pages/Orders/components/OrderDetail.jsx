import { Box, Button, Divider, Stack, Typography } from "@mui/material";

export default function OrderDetail({ order }) {
	return (
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
					>
						{order?.is_paid ? "Paid" : "Unpaid"}
					</Button>
					<Button
						variant="outlined"
						color={order?.is_served ? "success" : "error"}
						size="small"
					>
						{order?.is_served ? "Served" : "Not Served"}
					</Button>
				</Stack>
			</Stack>

			<Divider />
		</Box>
	);
}
