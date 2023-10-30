import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomPagination from "../../components/CustomPagination";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { PAGINATION_LIMIT } from "../../config";
import {
	useDeleteChefMutation,
	useGetChefsQuery,
} from "../../features/chefs/chefApi";
import ChefForm from "./components/ChefForm";
import ChefsTable from "./components/ChefsTable";

export default function Chefs() {
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
		data: chefs,
		isLoading,
		isError,
		error: responseError,
	} = useGetChefsQuery(params, {
		refetchOnMountOrArgChange: true,
	});

	const [deleteChef, { isSuccess: deleteSuccess, error: deleteResponseError }] =
		useDeleteChefMutation();

	const closeModal = () => {
		setOpenModal(false);
		setEdit(false);
		setEditData(null);
	};

	const editChefHandler = (data) => {
		setEdit(true);
		setEditData(data);
		setOpenModal(true);
	};

	const deleteHandler = (id) => {
		const res = window.confirm("Do you want to delete this item?");
		if (res) {
			dispatch(deleteChef({ id, params }));
		}
	};

	const onPageChange = (e, page) => {
		setPage(page);
		const newOffset = (page - 1) * params.limit;
		setParams({ ...params, offset: newOffset });
	};

	return (
		<>
			<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
				<Typography variant="h4" gutterBottom>
					Chefs
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpenModal(true)}
				>
					Add Chef
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
					<ChefsTable
						data={chefs}
						editChefHandler={editChefHandler}
						deleteHandler={deleteHandler}
					/>

					<CustomPagination
						totalPages={Math.ceil(chefs?.count / params.limit)}
						currentPage={page}
						onChange={onPageChange}
					/>
				</>
			)}

			{/* modal */}
			<Modal
				open={openModal}
				closeModal={closeModal}
				title={`${edit ? "Edit Chef" : "Add New Chef"}`}
				size="md"
			>
				<ChefForm
					closeModal={closeModal}
					queryParams={params}
					edit={edit}
					editData={editData}
				/>
			</Modal>
		</>
	);
}
