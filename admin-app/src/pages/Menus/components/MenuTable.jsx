import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert } from "@mui/material";

const rows = [
	{
		name: "abc",
		price: 155,
		offer_price: 100,
		cook_time: 100,
		created_at: new Date(),
		updated_at: new Date(),
		is_active: true,
	},
];

export default function MenuTable() {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell align="right">Name</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Offer Price</TableCell>
						<TableCell align="right">Cook Time</TableCell>
						<TableCell align="right">Created At</TableCell>
						<TableCell align="right">Updated At</TableCell>
						<TableCell align="right">Active</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows?.length > 0 ? (
						rows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								<TableCell align="right">{row.calories}</TableCell>
								<TableCell align="right">{row.fat}</TableCell>
								<TableCell align="right">{row.carbs}</TableCell>
								<TableCell align="right">{row.protein}</TableCell>
							</TableRow>
						))
					) : (
						<Alert severity="warning" title="No Data Found!"></Alert>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
