import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ColorHash from "color-hash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import DateRangeModal from "../../../components/DateRangeModal";
import { useLazyGetOrderStatsQuery } from "../../../features/statistics/statisticsApi";
import UseDateRange from "../../../hooks/useDateRange";

var colorHash = new ColorHash();

const dateInitialState = {
	start_date: moment(new Date()).subtract(6, "days").format("YYYY-MM-DD"),
	end_date: moment(new Date()).format("YYYY-MM-DD"),
};

export default function OrderPieChart() {
	const [params, setParams] = useState({
		start_date: null,
		end_date: null,
	});

	const [trigger, { data, isLoading, isError, error }] =
		useLazyGetOrderStatsQuery();

	const [
		showDateModal,
		startDate,
		endDate,
		openDateModal,
		closeDateModal,
		handleStartDate,
		handleEndDate,
		resetDates,
	] = UseDateRange(dateInitialState);

	const handleFilterByDate = () => {
		setParams({
			start_date: moment(new Date(startDate)).format("YYYY-MM-DD"),
			end_date: moment(new Date(endDate)).format("YYYY-MM-DD"),
		});

		trigger({
			start_date: moment(new Date(startDate)).format("YYYY-MM-DD"),
			end_date: moment(new Date(endDate)).format("YYYY-MM-DD"),
		});
	};

	const coloredData = data?.results.map((entry, index) => {
		return {
			...entry,
			fill: colorHash.hex(entry.name),
		};
	});

	useEffect(() => {
		trigger();
	}, []);

	return (
		<Paper sx={{ p: 2 }}>
			<Stack
				direction={"row"}
				justifyContent={"space-between"}
				alignItems={"baseline"}
			>
				<Box>
					<Typography variant="h5">Order Served</Typography>
					<Typography variant="body2" color={"GrayText"}>
						{params?.start_date && params?.end_date
							? `${params?.start_date} - ${params?.end_date}`
							: "Last 7 days"}
					</Typography>
				</Box>
				<Button onClick={openDateModal} variant="contained">
					Timeline
				</Button>
			</Stack>
			<Box mt={3} style={{ width: "100%", height: 400 }}>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={coloredData}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={100}
							label
						/>

						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</Box>

			<DateRangeModal
				open={showDateModal}
				handleClose={closeDateModal}
				handleSubmit={handleFilterByDate}
				startDate={startDate}
				endDate={endDate}
				handleStartDate={handleStartDate}
				handleEndDate={handleEndDate}
				resetDates={resetDates}
			/>
		</Paper>
	);
}
