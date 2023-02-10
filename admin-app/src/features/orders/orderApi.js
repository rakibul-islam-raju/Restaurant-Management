import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: (params) => `/orders`,
		}),

		// editCategory: builder.mutation({
		// 	query: ({ data, id }) => ({
		// 		url: `/categories/${id}`,
		// 		method: "PATCH",
		// 		body: data,
		// 	}),
		// 	async onQueryStarted(arg, { queryFulfilled, dispatch }) {
		// 		const patchResult = dispatch(
		// 			apiSlice.util.updateQueryData(
		// 				"getCategories",
		// 				arg.params,
		// 				(draft) => {
		// 					const category = draft.results.find((cat) => cat.id == arg.id);
		// 					category.name = arg.data.name;
		// 					category.slug = arg.data.slug;
		// 					category.updated_at = new Date();
		// 					category.is_active = arg.data.is_active;
		// 				}
		// 			)
		// 		);
		// 		try {
		// 			await queryFulfilled;
		// 		} catch (err) {
		// 			patchResult.undo();
		// 		}
		// 	},
		// }),
	}),
});

export const { useGetOrdersQuery } = orderApi;
