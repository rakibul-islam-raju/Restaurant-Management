import { Alert, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomPagination from "../../components/CustomPagination";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { PAGINATION_LIMIT } from "../../config";
import {
	useDeleteContactMutation,
	useGetContactsQuery,
} from "../../features/contact/contactApi";
import ContactDetails from "./component/ContactDetails";
import ContactTable from "./component/ContactTable";

export default function Contacts() {
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const [page, setPage] = useState(1);
	const [params, setParams] = useState({
		limit: PAGINATION_LIMIT,
		offset: 0,
	});
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);

	const {
		data: contacts,
		isLoading,
		isError,
		error: responseError,
	} = useGetContactsQuery(params, {
		refetchOnMountOrArgChange: true,
	});

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

	const onPageChange = (e, page) => {
		setPage(page);
		const newOffset = (page - 1) * params.limit;
		setParams({ ...params, offset: newOffset });
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
				<>
					<ContactTable
						data={contacts}
						editContactHandler={editContactHandler}
						deleteHandler={deleteHandler}
					/>

					<CustomPagination
						totalPages={Math.ceil(contacts?.count / params.limit)}
						currentPage={page}
						onChange={onPageChange}
					/>
				</>
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
