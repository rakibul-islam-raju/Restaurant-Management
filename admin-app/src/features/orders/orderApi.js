import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: (params) => `/orders`,
		}),

		getOrder: builder.query({
			query: (orderId) => `/orders/${orderId}`,
		}),

		editOrder: builder.mutation({
			query: ({ data, id }) => ({
				url: `/orders/${id}`,
				method: "PATCH",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				// update getOrders
				const patchResult1 = dispatch(
					apiSlice.util.updateQueryData("getOrders", arg.params, (draft) => {
						const order = draft.results?.find((item) => item.id == arg.id);
						order.is_paid = arg.data.is_paid;
						order.is_served = arg.data.is_served;
						order.is_active = arg.data.is_active;
						order.updated_at = new Date();
					})
				);

				// update getOrder
				const patchResult2 = dispatch(
					apiSlice.util.updateQueryData("getOrder", arg.id, (draft) => {
						draft.is_paid = arg.data.is_paid;
						draft.is_served = arg.data.is_served;
						draft.is_active = arg.data.is_active;
						draft.updated_at = new Date();
					})
				);
				try {
					await queryFulfilled;
				} catch (err) {
					patchResult1.undo();
					patchResult2.undo();
				}
			},
		}),
	}),
});

export const { useGetOrdersQuery, useGetOrderQuery, useEditOrderMutation } =
	orderApi;
