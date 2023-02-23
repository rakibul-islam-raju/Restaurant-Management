import axiosInstance from "@/utils/axios";

export const createOrder = async (data) => {
	const response = await axiosInstance.post("/orders", data);
	return response.data;
};

export const getOrder = async () => {};

export const getOrders = async () => {};

export default { createOrder, getOrder, getOrders };
