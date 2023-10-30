import axiosInstance from "@/utils/axios";

export const getStats = async () => {
	const response = await axiosInstance.get("/statistics/summary");
	return response.data;
};

export default { getStats };
