import axiosInstance from "@/utils/axios";

export const subscribe = async (data) => {
	const response = await axiosInstance.post("/subscribers", data);
	return response.data;
};

export default { subscribe };
