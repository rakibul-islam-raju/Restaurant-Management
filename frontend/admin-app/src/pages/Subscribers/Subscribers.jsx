import SearchIcon from "@mui/icons-material/Search";
import {
	Alert,
	Box,
	Divider,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomPagination from "../../components/CustomPagination";
import Loader from "../../components/Loader";
import { PAGINATION_LIMIT } from "../../config";
import {
	useDeleteSubscriberMutation,
	useLazyGetSubscribersQuery,
} from "../../features/subscriber/subscribersApi";
import SubscribersTable from "./components/SubscribersTable";

export default function Subscribers() {
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const [page, setPage] = useState(1);
	const [params, setParams] = useState({
		limit: PAGINATION_LIMIT,
		offset: 0,
	});
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const [
		trigger,
		{ data: subscribers, isLoading, isError, error: responseError },
	] = useLazyGetSubscribersQuery(params, {
		refetchOnMountOrArgChange: true,
	});

	const debouncedSearch = useCallback(
		debounce((value) => {
			trigger({ ...params, search: value });
		}, 1000),
		[]
	);

	const handleSearch = (event) => {
		const value = event.target.value;
		setSearchTerm(value);
		debouncedSearch(value);
	};

	const [
		deleteSubscriber,
		{ isSuccess: deleteSuccess, error: deleteResponseError },
	] = useDeleteSubscriberMutation();

	const closeModal = () => {
		setOpenModal(false);
		setEdit(false);
		setEditData(null);
	};

	const deleteHandler = (id) => {
		const res = window.confirm("Do you want to delete this item?");
		if (res) {
			dispatch(deleteSubscriber({ id, params }));
		}
	};

	const onPageChange = (e, page) => {
		setPage(page);
		const newOffset = (page - 1) * params.limit;
		setParams({ ...params, offset: newOffset });
	};

	useEffect(() => {
		if (searchTerm) {
			trigger({ ...params, search: searchTerm });
		} else {
			trigger(params);
		}
	}, []);

	return (
		<>
			<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
				<Typography variant="h4" gutterBottom>
					Subscribers
				</Typography>
				<Box width={4 / 12}>
					<TextField
						label="Search"
						placeholder="Email Address"
						variant="outlined"
						fullWidth
						type={"email"}
						value={searchTerm}
						onChange={handleSearch}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconButton
										aria-label="user search with email"
										// onClick={handleClickShowPassword}
										// onMouseDown={handleMouseDownPassword}
										edge="start"
									>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Box>
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
					<SubscribersTable data={subscribers} deleteHandler={deleteHandler} />

					<CustomPagination
						totalPages={Math.ceil(subscribers?.count / params.limit)}
						currentPage={page}
						onChange={onPageChange}
					/>
				</>
			)}
		</>
	);
}
