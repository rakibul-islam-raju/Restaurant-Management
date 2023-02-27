import axiosInstance from "@/utils/axios";

export const getCampaigns = async (params) => {
	const response = await axiosInstance.get("/campaigns", { params });
	return response.data;
};

export default { getCampaigns };
