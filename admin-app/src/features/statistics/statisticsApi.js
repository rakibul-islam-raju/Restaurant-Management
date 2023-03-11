import { apiSlice } from "../api/apiSlice";

export const statisticsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSummary: builder.query({
			query: (params) => ({
				url: `/statistics/summary`,
				params,
			}),
			providesTags: ["SummaryStats"],
		}),
		getOrderStats: builder.query({
			query: (params) => ({
				url: `/statistics/orders`,
				params,
			}),
			providesTags: ["OrderStatistics"],
		}),
		getServedOrderStats: builder.query({
			query: (params) => ({
				url: `/statistics/orders/served`,
				params,
			}),
			providesTags: ["ServedOrderStatistics"],
		}),
	}),
});

export const {
	useGetSummaryQuery,
	useGetOrderStatsQuery,
	useGetServedOrderStatsQuery,
	useLazyGetOrderStatsQuery,
	useLazyGetServedOrderStatsQuery,
} = statisticsApi;
