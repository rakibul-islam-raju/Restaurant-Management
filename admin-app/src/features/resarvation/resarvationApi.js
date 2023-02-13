import { apiSlice } from "../api/apiSlice";

export const resarvationApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getResarvations: builder.query({
			query: (params) => `/resarvations`,
		}),

		editResarvation: builder.mutation({
			query: ({ data, id }) => ({
				url: `/resarvations/${id}`,
				method: "PATCH",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getResarvations",
						arg.params,
						(draft) => {
							const resarvation = draft.results.find((cat) => cat.id == arg.id);
							resarvation.name = arg.data.name;
							resarvation.date = arg.data.date;
							resarvation.time = arg.data.time;
							resarvation.person = arg.data.person;
							resarvation.updated_at = new Date();
							resarvation.is_active = arg.data.is_active;
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (err) {
					patchResult.undo();
				}
			},
		}),

		deleteResarvation: builder.mutation({
			query: ({ id }) => ({
				url: `/resarvations/${id}`,
				method: "DELETE",
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getResarvations",
						arg.params,
						(draft) => {
							draft.results = draft.results.filter((item) => item.id != arg.id);
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (err) {
					patchResult.undo();
				}
			},
		}),
	}),
});

export const {
	useGetResarvationsQuery,
	useEditResarvationMutation,
	useDeleteResarvationMutation,
} = resarvationApi;
