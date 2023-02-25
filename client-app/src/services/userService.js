import axiosInstance from "@/utils/axios";

export const editProfile = async (data) => {
	const response = await axiosInstance.post("/accounts/login", data);
	return response.data;
};

export const changePassword = async (data) => {
	const response = await axiosInstance.post("/accounts/registration", data);
	return response.data;
};

export default { editProfile, changePassword };
