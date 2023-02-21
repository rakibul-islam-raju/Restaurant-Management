import axiosInstance from "@/utils/axios";

export const getMenus = async (params) => {
	console.log("params =>", params);
	const res = await axiosInstance.get("/menus", { params: { ...params } });
	return res.data;
};

export const getFeaturedMenus = async (params) => {
	const res = await axiosInstance.get("/menus/top-rated", {
		params: { ...params },
	});
	return res.data;
};

export default { getMenus, getFeaturedMenus };
