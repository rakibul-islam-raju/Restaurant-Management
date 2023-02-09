import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMenus: builder.query({
			query: (params) => `/menus`,
		}),

		addMenu: builder.mutation({
			query: ({ data }) => ({
				url: "/menus",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData("getMenus", arg.params, (draft) => {
						const newMenu = { ...arg.data };
						newMenu.id = draft[draft.length - 1].id + 1;

						draft.unshift(newMenu);
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

export const { useGetMenusQuery, useAddMenuMutation } = authApi;
