import { apiSlice } from "../api/apiSlice";

export const reservationApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getReservations: builder.query({
			query: (params) => ({
				url: `/resarvations`,
				params,
			}),
		}),

		addReservation: builder.mutation({
			query: ({ data }) => ({
				url: "/resarvations",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["SummaryStats"],
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getReservations",
						arg.params,
						(draft) => {
							const newReservation = { ...arg.data };
							newReservation.id = draft.results[0] + 1;
							newReservation.created_at = new Date();
							newReservation.updated_at = new Date();
							newReservation.is_active = true;

							draft.results.unshift(newReservation);
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

		editReservation: builder.mutation({
			query: ({ data, id }) => ({
				url: `/resarvations/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["SummaryStats"],
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getReservations",
						arg.params,
						(draft) => {
							const resarvation = draft.results.find((cat) => cat.id == arg.id);
							if (arg.data.date) resarvation.date = arg.data.date;
							if (arg.data.time) resarvation.time = arg.data.time;
							if (arg.data.person) resarvation.person = arg.data.person;
							if (arg.data.is_active)
								resarvation.is_active = arg.data.is_active;

							resarvation.updated_at = new Date();
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
