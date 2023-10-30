import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomPagination from "../../components/CustomPagination";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { PAGINATION_LIMIT } from "../../config";
import {
	useDeleteMenuMutation,
	useGetMenusQuery,
} from "../../features/menu/menuApi";
import MenuForm from "./components/MenuForm";
import MenuTable from "./components/MenuTable";

export default function Menus() {
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);
	const [page, setPage] = useState(1);
	const [params, setParams] = useState({
		limit: PAGINATION_LIMIT,
		offset: 0,
	});

	const {
		data: menus,
		isLoading,
		isError,
		error: responseError,
	} = useGetMenusQuery(params, {
		refetchOnMountOrArgChange: true,
	});

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

	const onPageChange = (e, page) => {
		setPage(page);
		const newOffset = (page - 1) * params.limit;
		setParams({ ...params, offset: newOffset });
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
			) : isError ? (
				<Alert severity="error">
					{responseError?.data?.detail ||
						deleteResponseError?.data?.detail ||
						"Something went wrong!"}
				</Alert>
			) : (
				<>
					<MenuTable
						data={menus}
						editMenuHandler={editMenuHandler}
						deleteHandler={deleteHandler}
					/>

					<CustomPagination
						totalPages={Math.ceil(menus?.count / params.limit)}
						currentPage={page}
						onChange={onPageChange}
					/>
				</>
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
