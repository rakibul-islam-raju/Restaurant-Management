import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import jwt_decode from "jwt-decode";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BASE_API_URL,
	prepareHeaders: async (headers, { getState }) => {
		const token = getState()?.auth?.access;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();

	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			try {
				// send the refresh token to get new access token
				const refresh = api.getState().auth.refresh;
				const refreshResult = await baseQuery(
					{
						url: "/accounts/refresh",
						method: "POST",
						body: { refresh },
					},
					api,
					extraOptions
				);
				if (refreshResult?.data) {
					const decodedUserData = jwt_decode(refreshResult.data.access);

					localStorage.setItem(
						"takeMyOrder_auth",
						JSON.stringify({
							access: refreshResult.data.access,
							refresh: refreshResult.data.refresh,
							user: decodedUserData,
						})
					);

					api.dispatch(
						userLoggedIn({
							access: refreshResult.data.access,
							refresh: refreshResult.data.refresh,
							user: decodedUserData,
						})
					);

					// retry with new access token
					result = await baseQuery(args, api, extraOptions);
				} else {
					localStorage.removeItem("takeMyOrder_auth");
					api.dispatch(userLoggedOut());
				}
			} finally {
				// release must be called once the mutex should be released again.
				release();
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}

	return result;
};

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	tagTypes: [],
	endpoints: (builder) => ({}),
});
