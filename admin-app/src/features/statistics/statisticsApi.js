import { apiSlice } from "../api/apiSlice";

export const statisticsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSummary: builder.query({
			query: (params) => `/statistics/summary`,
			providesTags: ["SummaryStats"],
		}),
	}),
});

export const { useGetSummaryQuery } = statisticsApi;
