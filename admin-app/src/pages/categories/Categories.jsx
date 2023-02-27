import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomPagination from "../../components/CustomPagination";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { PAGINATION_LIMIT } from "../../config";
import {
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
} from "../../features/category/categoryApi";
import CategoryForm from "./components/categoryForm";
import CategoryTable from "./components/CategoryTable";

export default function Categories() {
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
		data: categories,
		isLoading,
		isError,
		error: responseError,
	} = useGetCategoriesQuery(params, {
		refetchOnMountOrArgChange: true,
	});

	const [
		deleteCategory,
		{ isSuccess: deleteSuccess, error: deleteResponseError },
	] = useDeleteCategoryMutation();

	const closeModal = () => {
		setOpenModal(false);
		setEdit(false);
		setEditData(null);
	};

	const editCategoryHandler = (data) => {
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

	return (
		<>
			<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
				<Typography variant="h4" gutterBottom>
					Categories
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpenModal(true)}
				>
					Add Category
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
					<CategoryTable
						data={categories}
						editCategoryHandler={editCategoryHandler}
						deleteHandler={deleteHandler}
					/>

					<CustomPagination
						totalPages={Math.ceil(categories?.count / params.limit)}
						currentPage={page}
						onChange={onPageChange}
					/>
				</>
			)}

			{/* modal */}
			<Modal
				open={openModal}
				closeModal={closeModal}
				title={`${edit ? "Edit Category" : "Add New Category"}`}
				size="md"
			>
				<CategoryForm
					closeModal={closeModal}
					queryParams={params}
					edit={edit}
					editData={editData}
				/>
			</Modal>
		</>
	);
}
