import EmailIcon from "@mui/icons-material/Email";
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	InputAdornment,
	Radio,
	RadioGroup,
	Stack,
	TextField,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	applyFilter,
	clearFilter,
	setFilter,
} from "../../../features/orders/OrderSlice";

export default function FilterList({ submitButtonHandler }) {
	const dispatch = useDispatch();
	const { filters, filterApplied } = useSelector((state) => state.order);

	const filterApplyHandler = () => {
		dispatch(applyFilter(true));
	};

	const handleSetFilter = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		dispatch(setFilter({ key, value }));
	};

	const activeFilterButton =
		!!filters?.user__email ||
		!!filters?.is_active ||
		!!filters?.is_paid ||
		!!filters?.is_served;

	return (
		<Box mt={2} p={2}>
			<TextField
				label="Email Filter"
				placeholder="Email Address"
				variant="outlined"
				fullWidth
				type={"email"}
				value={filters.user__email}
				name="user__email"
				onChange={handleSetFilter}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<IconButton aria-label="user search with email" edge="start">
								<EmailIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Stack component={"form"} gap={4} justifyContent={"flex-end"} mt={4}>
				<FormControl>
					<FormLabel id="paid-radio">Paid</FormLabel>
					<RadioGroup
						value={filters.is_paid}
						onChange={handleSetFilter}
						row
						aria-labelledby="paid-radio"
						name="is_paid"
					>
						<FormControlLabel value={true} control={<Radio />} label="Yes" />
						<FormControlLabel value={false} control={<Radio />} label="No" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel id="served-radio">Served</FormLabel>
					<RadioGroup
						value={filters.is_served}
						onChange={handleSetFilter}
						row
						aria-labelledby="served-radio"
						name="is_served"
					>
						<FormControlLabel value={true} control={<Radio />} label="Yes" />
						<FormControlLabel value={false} control={<Radio />} label="No" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel id="active-radio">Active</FormLabel>
					<RadioGroup
						value={filters.is_active}
						onChange={handleSetFilter}
						row
						aria-labelledby="active-radio"
						name="is_active"
					>
						<FormControlLabel value={true} control={<Radio />} label="Yes" />
						<FormControlLabel value={false} control={<Radio />} label="No" />
					</RadioGroup>
				</FormControl>
				<Stack direction={"row"} gap={2} justifyContent={"flex-start"}>
					<Button
						onClick={() => {
							dispatch(clearFilter());
							submitButtonHandler();
						}}
						color="error"
						variant="contained"
						disabled={!filterApplied}
					>
						Clear
					</Button>
					<Button
						onClick={() => {
							filterApplyHandler();
							submitButtonHandler();
						}}
						color="primary"
						variant="contained"
						disabled={!activeFilterButton}
					>
						Apply
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
}
