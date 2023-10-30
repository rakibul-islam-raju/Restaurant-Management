import axiosInstance from "@/utils/axios";

export const createReservation = async (data) => {
	const res = await axiosInstance.post("/resarvations", data);
	return res.data;
};

export const getReservations = async (email, params) => {
	const res = await axiosInstance.get("/resarvations", {
		...params,
		user__email: email,
	});
	return res.data;
};

export default { createReservation, getReservations };
