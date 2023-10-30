import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function DateRangeModal({
	open,
	handleClose,
	handleSubmit,
	startDate,
	endDate,
	handleStartDate,
	handleEndDate,
	resetDates,
}) {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="scroll-dialog-title">
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography>Select Date Range</Typography>
					<CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
				</Box>
			</DialogTitle>
			<DialogContent>
				<Stack direction={"row"} gap={2}>
					<DatePicker
						label="Start Date"
						onChange={(newValue) => {
							handleStartDate(newValue);
						}}
						value={startDate}
						// inputFormat="yyyy-MM-DD"
						renderInput={(params) => (
							<TextField
								variant="standard"
								type="date"
								margin="normal"
								required
								fullWidth
								{...params}
							/>
						)}
					/>
					<DatePicker
						label="End Date"
						onChange={(newValue) => {
							handleEndDate(newValue);
						}}
						value={endDate}
						// inputFormat="yyyy-MM-DD"
						renderInput={(params) => (
							<TextField
								variant="standard"
								type="date"
								margin="normal"
								required
								fullWidth
								{...params}
							/>
						)}
					/>
				</Stack>

				<Button variant="text" color="primary" onClick={resetDates}>
					Reset
				</Button>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
					fullWidth
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
}
