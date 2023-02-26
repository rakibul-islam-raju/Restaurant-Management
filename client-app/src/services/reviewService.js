import axiosInstance from "@/utils/axios";

export const createReview = async (data) => {
	const res = await axiosInstance.post("/reviews", data);
	return res.data;
};
export const getReviewsByMenuId = async (params) => {};

export default { createReview, getReviewsByMenuId };
