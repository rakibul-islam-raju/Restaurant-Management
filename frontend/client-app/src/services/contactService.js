import axiosInstance from "@/utils/axios";

export const postContact = async (data) => {
	const response = await axiosInstance.post("/contacts", data);
	return response.data;
};

export default { postContact };
