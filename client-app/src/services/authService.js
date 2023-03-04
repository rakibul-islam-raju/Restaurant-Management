import axios from "axios";

export const login = async (data) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_BASE_URL}/accounts/login`,
		data
	);
	return response.data;
};

export const register = async (data) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_BASE_URL}/accounts/registration`,
		data
	);
	return response.data;
};

export default { login, register };
