import { apiSlice } from "../api/apiSlice";

export const subscribersApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSubscribers: builder.query({
			query: (params) => ({
				url: `/subscribers`,
				params: { ...params },
			}),
		}),

		createSubscriber: builder.mutation({
			query: ({ data }) => ({
				url: `/subscribers`,
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getSubscribers",
						arg.params,
						(draft) => {
							const newSubscriber = { ...arg.data };
							newSubscriber.id = draft.results[0] + 1;
							newSubscriber.subscribed_date = new Date();

							draft.results.unshift(newSubscriber);
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

		deleteSubscriber: builder.mutation({
			query: ({ id }) => ({
				url: `/subscribers/${id}`,
				method: "DELETE",
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getSubscribers",
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
	useGetSubscribersQuery,
	useLazyGetSubscribersQuery,
	useCreateSubscriberMutation,
	useDeleteSubscriberMutation,
} = subscribersApi;
