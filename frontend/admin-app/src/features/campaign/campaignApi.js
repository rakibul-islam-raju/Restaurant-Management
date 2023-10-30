import { apiSlice } from "../api/apiSlice";

export const campaignApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCampaigns: builder.query({
			query: (params) => ({
				url: "/campaigns",
				params,
			}),
			providesTags: ["Campaigns"],
		}),

		addCampaign: builder.mutation({
			query: ({ data }) => ({
				url: "/campaigns",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Campaigns", "SummaryStats"],
		}),

		editCampaign: builder.mutation({
			query: ({ data, id }) => ({
				url: `/campaigns/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Campaigns", "SummaryStats"],
		}),

		deleteCampaign: builder.mutation({
			query: ({ id }) => ({
				url: `/campaigns/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["SummaryStats"],
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData("getCampaigns", arg.params, (draft) => {
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
	useGetCampaignsQuery,
	useAddCampaignMutation,
	useEditCampaignMutation,
	useDeleteCampaignMutation,
} = campaignApi;
