import { apiSlice } from "../api/apiSlice";

export const statisticsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSummary: builder.query({
			query: (params) => `/statistics/summary`,
		}),
	}),
});

export const { useGetSummaryQuery } = statisticsApi;
