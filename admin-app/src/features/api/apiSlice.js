import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_API_URL,
		prepareHeaders: async (headers, { getState, endpoint }) => {
			const token = getState()?.auth?.access;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	tagTypes: [],
	endpoints: (builder) => ({}),
});
