import axiosInstance from "@/utils/axios";

export const login = async (data) => {
	const response = await axiosInstance.post("/accounts/login", data);
	return response.data;
};

export const register = async (data) => {
	const response = await axiosInstance.post("/accounts/registration", data);
	return response.data;
};

export default { login, register };
