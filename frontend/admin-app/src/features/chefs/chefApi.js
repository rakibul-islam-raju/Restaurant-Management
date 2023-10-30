import { apiSlice } from "../api/apiSlice";

export const chefApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChefs: builder.query({
			query: (params) => ({
				url: `/chefs`,
				params,
			}),
			providesTags: ["Chefs"],
		}),

		addChef: builder.mutation({
			query: ({ data }) => ({
				url: "/chefs",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Chefs"],
		}),

		editChef: builder.mutation({
			query: ({ data, id }) => ({
				url: `/chefs/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Chefs"],
		}),

		deleteChef: builder.mutation({
			query: ({ id }) => ({
				url: `/chefs/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Chefs"],
		}),
	}),
});

export const {
	useGetChefsQuery,
	useAddChefMutation,
	useEditChefMutation,
	useDeleteChefMutation,
} = chefApi;
