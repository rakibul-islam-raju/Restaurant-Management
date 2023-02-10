import { Button, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import {
	useDeleteMenuMutation,
	useGetMenusQuery,
} from "../../features/menu/menuApi";
import MenuForm from "./components/MenuForm";
import MenuTable from "./components/MenuTable";

export default function Menus() {
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const [params, setParams] = useState("");
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);

	const {
		data: menus,
		isLoading,
		isError,
		error: responseError,
	} = useGetMenusQuery(params);

	const [
		deleteCategory,
		{ isSuccess: deleteSuccess, error: deleteResponseError },
	] = useDeleteMenuMutation();

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

	const deleteHandler = (id) => {
		const res = window.confirm("Do you want to delete this item?");
		if (res) {
			dispatch(deleteCategory({ id, params }));
		}
	};

	useEffect(() => {
		if (deleteSuccess) {
			closeModal;
		}
	}, [deleteSuccess]);

	return (
		<>
			<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
				<Typography variant="h4" gutterBottom>
					Menus
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpenModal(true)}
				>
					Add Menu
				</Button>
			</Stack>
			<Divider />
			<br />

			{isLoading ? (
				<Loader />
			) : (
				<MenuTable
					data={menus}
					editMenuHandler={editMenuHandler}
					deleteHandler={deleteHandler}
				/>
			)}

			{/* modal */}
			<Modal
				open={openModal}
				closeModal={closeModal}
				title="Add New Menu"
				size="md"
			>
				<MenuForm
					closeModal={closeModal}
					queryParams={params}
					edit={edit}
					editData={editData}
				/>
			</Modal>
		</>
	);
}
