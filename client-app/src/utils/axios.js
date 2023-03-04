import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";

function logout() {
	destroyCookie(null, "access");
	destroyCookie(null, "refresh");
}

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
	const { access } = parseCookies();
	if (access) {
		config.headers.Authorization = `Bearer ${access}`;
	}
	return config;
});

let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
	failedRequestsQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedRequestsQueue = [];
};

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response.status === 401 &&
			!originalRequest?._retry &&
			!isRefreshing
		) {
			originalRequest._retry = true;

			try {
				const { refresh } = parseCookies();
				isRefreshing = true;
				const response = await axiosInstance.post("/accounts/refresh", {
					refresh,
				});
				const access = response.data.access;
				const refreshToken = response.data.access;
				setCookie(null, "access", access);
				setCookie(null, "refresh", refreshToken);
				axiosInstance.defaults.headers.Authorization = `Bearer ${access}`;
				processQueue(null, access);
				return axiosInstance(originalRequest);
			} catch (error) {
				logout();
				processQueue(error, null);
				return Promise.reject(error);
			} finally {
				isRefreshing = false;
			}
		} else if (error.response.status === 401) {
			const retryOriginalRequest = new Promise((resolve, reject) => {
				failedRequestsQueue.push({ resolve, reject });
			});
			return retryOriginalRequest;
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
