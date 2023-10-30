import { useState } from "react";

const UseDateRange = (dateInitialState) => {
	const [showDateModal, setShowDateModal] = useState(false);
	const [startDate, setStartDate] = useState(dateInitialState?.start_date);
	const [endDate, setEndDate] = useState(dateInitialState?.end_date);

	const openDateModal = () => {
		setShowDateModal(true);
	};

	const closeDateModal = () => {
		setShowDateModal(false);
	};

	const handleStartDate = (date) => {
		setStartDate(date);
	};

	const handleEndDate = (date) => {
		setEndDate(date);
	};

	const resetDates = () => {
		setStartDate(dateInitialState?.start_date);
		setEndDate(dateInitialState?.end_date);
	};
	return [
		showDateModal,
		startDate,
		endDate,
		openDateModal,
		closeDateModal,
		handleStartDate,
		handleEndDate,
		resetDates,
	];
};

export default UseDateRange;
