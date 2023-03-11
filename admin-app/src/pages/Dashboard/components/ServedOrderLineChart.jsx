import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import DateRangeModal from "../../../components/DateRangeModal";
import { useLazyGetServedOrderStatsQuery } from "../../../features/statistics/statisticsApi";
import UseDateRange from "../../../hooks/useDateRange";

const dateInitialState = {
	start_date: moment(new Date()).subtract(6, "days").format("YYYY-MM-DD"),
	end_date: moment(new Date()).format("YYYY-MM-DD"),
};

export default function ServedOrderLineChart() {
	const [params, setParams] = useState({
		start_date: null,
		end_date: null,
	});

	const [trigger, { data, isLoading, isError, error }] =
		useLazyGetServedOrderStatsQuery();

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
					<BarChart
						data={data?.results}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
						barSize={20}
					>
						<Bar dataKey="value" fill="#2979ff" background={{ fill: "#ddd" }} />
						<XAxis
							dataKey="date"
							scale="point"
							padding={{ left: 10, right: 10 }}
						/>
						<YAxis />
						<Tooltip />
						<Legend />
					</BarChart>
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
