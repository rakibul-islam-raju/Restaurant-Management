import axiosInstance from "@/utils/axios";

export const createOrder = async (data) => {
	const response = await axiosInstance.post("/orders", data);
	return response.data;
};

export const getOrders = async (email) => {
	const response = await axiosInstance.get(`orders`, {
		params: { user__email: email },
	});
	return response.data;
};

export const getOrder = async (id) => {
	const response = await axiosInstance.get(`orders/${id}`);
	return response.data;
};

export default { createOrder, getOrder, getOrders };
