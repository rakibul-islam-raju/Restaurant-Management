import SearchIcon from "@mui/icons-material/Search";
import {
	Alert,
	Divider,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import CustomPagination from "../../components/CustomPagination";
import Loader from "../../components/Loader";
import { PAGINATION_LIMIT } from "../../config";
import { useLazyGetUsersQuery } from "../../features/users/usersApi";
import UsersTable from "./components/UsersTable";

export default function Users() {
	const [trigger, { data: users, isLoading, isError, error: responseError }] =
		useLazyGetUsersQuery();

	const [page, setPage] = useState(1);
	const [params, setParams] = useState({
		limit: PAGINATION_LIMIT,
		offset: 0,
	});
	const [searchTerm, setSearchTerm] = useState("");

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
					Users
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
					{responseError?.data?.detail || "Something went wrong!"}
				</Alert>
			) : (
				<>
					<UsersTable data={users} />

					<CustomPagination
						totalPages={Math.ceil(users?.count / params.limit)}
						currentPage={page}
						onChange={onPageChange}
					/>
				</>
			)}
		</>
	);
}
