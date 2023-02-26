import axiosInstance from "@/utils/axios";

export const createReview = async (data) => {
	const res = await axiosInstance.post("/reviews", data);
	return res.data;
};

export const getReviewsByUser = async (email, params) => {
	const res = await axiosInstance.get(`/reviews`, {
		params: { ...params, user__email: email },
	});
	return res.data;
};

export const getTopRatedReviews = async (params) => {
	const res = await axiosInstance.get(`/reviews`, {
		params: { ...params, ordering: "rating" },
	});
	return res.data;
};

export default { createReview, getReviewsByUser, getTopRatedReviews };
