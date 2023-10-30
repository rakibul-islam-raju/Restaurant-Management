import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({});

export default function CustomPagination({
	totalPages,
	currentPage,
	onChange,
}) {
	return (
		<Box display={"flex"} justifyContent={"flex-end"} my={4}>
			<Stack spacing={2}>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={onChange}
					color="primary"
					shape="rounded"
				/>
			</Stack>
		</Box>
	);
}
