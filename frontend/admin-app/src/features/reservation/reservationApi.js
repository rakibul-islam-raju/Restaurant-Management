import { apiSlice } from "../api/apiSlice";

export const reservationApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getReservations: builder.query({
			query: (params) => ({
				url: `/resarvations`,
				params,
			}),
			providesTags: ["GetReservations"],
		}),

		addReservation: builder.mutation({
			query: ({ data }) => ({
				url: "/resarvations",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["GetReservations", "SummaryStats"],
		}),

		editReservation: builder.mutation({
			query: ({ data, id }) => ({
				url: `/resarvations/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["GetReservations", "SummaryStats"],
		}),

		deleteReservation: builder.mutation({
			query: ({ id }) => ({
				url: `/resarvations/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["SummaryStats"],
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getReservations",
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
	useGetReservationsQuery,
	useAddReservationMutation,
	useEditReservationMutation,
	useDeleteReservationMutation,
} = reservationApi;
