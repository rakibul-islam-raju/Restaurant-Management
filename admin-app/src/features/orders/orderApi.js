import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: (params = {}) => ({
				url: `/orders`,
				params,
			}),
			providesTags: ["GetOrders"],
		}),

		getOrder: builder.query({
			query: (orderId) => `/orders/${orderId}`,
			providesTags: ["GetOrder"],
		}),

		editOrder: builder.mutation({
			query: ({ data, id }) => ({
				url: `/orders/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["SummaryStats", "GetOrders", "GetOrder"],
		}),
	}),
});

export const {
	useGetOrdersQuery,
	useLazyGetOrdersQuery,
	useGetOrderQuery,
	useEditOrderMutation,
} = orderApi;
