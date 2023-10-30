import axiosInstance from "@/utils/axios";

export const getCategories = async (params) => {
	const res = await axiosInstance.get("/categories", { params: { ...params } });
	return res.data;
};

export default { getCategories };
