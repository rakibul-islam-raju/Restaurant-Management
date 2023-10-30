import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const login = async (data) => {
	const response = await axios.post(`${BASE_URL}/accounts/login`, data);
	return response.data;
};

export const register = async (data) => {
	const response = await axios.post(`${BASE_URL}/accounts/registration`, data);
	return response.data;
};

export const refresh = async (data) => {
	const response = await axios.post(`${BASE_URL}/accounts/refresh`, data);
	return response.data;
};

export default { login, register, refresh };
