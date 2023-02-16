import { Alert, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import {
	useDeleteContactMutation,
	useGetContactsQuery,
} from "../../features/contact/contactApi";
import ContactDetails from "./component/ContactDetails";
import ContactTable from "./component/ContactTable";

export default function Contacts() {
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const [params, setParams] = useState("");
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);

	const {
		data: contacts,
		isLoading,
		isError,
		error: responseError,
	} = useGetContactsQuery(params);

	const [
		deleteContact,
		{ isSuccess: deleteSuccess, error: deleteResponseError },
	] = useDeleteContactMutation();

	const closeModal = () => {
		setOpenModal(false);
		setEdit(false);
		setEditData(null);
	};

	const editContactHandler = (data) => {
		setEdit(true);
		setEditData(data);
		setOpenModal(true);
	};

	const deleteHandler = (id) => {
		const res = window.confirm("Do you want to delete this item?");
		if (res) {
			dispatch(deleteContact({ id, params }));
		}
	};

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Contacts
			</Typography>

			<Divider />
			<br />

			{isLoading ? (
				<Loader />
			) : isError ? (
				<Alert severity="error">
					{responseError?.data?.detail ||
						deleteResponseError?.data?.detail ||
						"Something went wrong!"}
				</Alert>
			) : (
				<ContactTable
					data={contacts}
					editContactHandler={editContactHandler}
					deleteHandler={deleteHandler}
				/>
			)}

			{/* modal */}
			<Modal
				open={openModal}
				closeModal={closeModal}
				title={`${edit ? "Contact Details" : ""}`}
				size="md"
			>
				<ContactDetails
					closeModal={closeModal}
					queryParams={params}
					edit={edit}
					editData={editData}
				/>
			</Modal>
		</>
	);
}
