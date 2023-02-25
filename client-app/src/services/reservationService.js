import axiosInstance from "@/utils/axios";

export const createReservation = async (data) => {
	const res = await axiosInstance.get("/resarvations", data);
	return res.data;
};

export const getReservations = async (params) => {
	const res = await axiosInstance.get("/resarvations", { params });
	return res.data;
};

export default { createReservation, getReservations };
