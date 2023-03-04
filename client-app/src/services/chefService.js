import axiosInstance from "@/utils/axios";

export const getChefs = async (params) => {
	const response = await axiosInstance.get("/chefs", { params });
	return response.data;
};

export default { getChefs };
