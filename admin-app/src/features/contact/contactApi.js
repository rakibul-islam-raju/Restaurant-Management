import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getContacts: builder.query({
			query: (params) => `/contacts`,
		}),

		editContact: builder.mutation({
			query: ({ data, id }) => ({
				url: `/contacts/${id}`,
				method: "PATCH",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData("getContacts", arg.params, (draft) => {
						const contact = draft.results.find((c) => c.id == arg.id);
						contact.read = arg.data.read;
						// contact.is_active = arg.data.is_active;
					})
				);
				try {
					await queryFulfilled;
				} catch (err) {
					patchResult.undo();
				}
			},
		}),

		deleteContact: builder.mutation({
			query: ({ id }) => ({
				url: `/contacts/${id}`,
				method: "DELETE",
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData("getContacts", arg.params, (draft) => {
						draft.results = draft.results.filter((item) => item.id != arg.id);
					})
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
	useGetContactsQuery,
	useEditContactMutation,
	useDeleteContactMutation,
} = contactApi;
