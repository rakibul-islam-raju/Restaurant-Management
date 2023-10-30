import axiosInstance from "@/utils/axios";

export const changePassword = async (data) => {
	const response = await axiosInstance.post("/accounts/change-password", data);
	return response.data;
};

export const getLoggedInUserData = async (email) => {
	const response = await axiosInstance.get(`/accounts/me/${email}`);
	return response.data;
};

export const editProfile = async ({ data, email }) => {
	const response = await axiosInstance.patch(`/accounts/me/${email}`, data);
	return response.data;
};

export default { editProfile, changePassword, getLoggedInUserData };
