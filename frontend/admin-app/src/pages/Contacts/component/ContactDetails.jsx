import { Box, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useEditContactMutation } from "../../../features/contact/contactApi";

export default function ContactDetails({
	closeModal,
	queryParams,
	edit,
	editData,
}) {
	const dispatch = useDispatch();

	const [editContact, { isLoading, isSuccess }] = useEditContactMutation();

	useEffect(() => {
		if (edit && editData?.id) {
			const timer = setTimeout(() => {
				dispatch(
					editContact({
						data: { read: true },
						id: editData.id,
						params: queryParams,
					})
				);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, []);

	return (
		edit && (
			<Box>
				<Typography variant="h4">{editData?.name}</Typography>
				<Typography variant="body2" color="GrayText" gutterBottom>
					{editData?.email}
				</Typography>
				<Typography gutterBottom component={"strong"}>
					{editData?.subject}
				</Typography>
				<Divider sx={{ my: 3 }} />
				<Typography variant="body" component={"p"}>
					{editData?.message}
				</Typography>
			</Box>
		)
	);
}
