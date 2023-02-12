import { apiSlice } from "../api/apiSlice";

export const menuApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMenus: builder.query({
			query: (params) => `/menus`,
			providesTags: ["Menus"],
		}),

		addMenu: builder.mutation({
			query: ({ data }) => ({
				url: "/menus",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Menus"],
		}),

		editMenu: builder.mutation({
			query: ({ data, id }) => ({
				url: `/menus/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Menus"],
		}),

		deleteMenu: builder.mutation({
			query: ({ id }) => ({
				url: `/menus/${id}`,
				method: "DELETE",
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData("getMenus", arg.params, (draft) => {
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
	useGetMenusQuery,
	useAddMenuMutation,
	useEditMenuMutation,
	useDeleteMenuMutation,
} = menuApi;
