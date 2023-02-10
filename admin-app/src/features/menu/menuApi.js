import { apiSlice } from "../api/apiSlice";

export const menuApi = apiSlice.injectEndpoints({
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
						newMenu.id = draft.results[0] + 1;
						newMenu.created_at = new Date();
						newMenu.updated_at = new Date();
						newMenu.is_active = true;

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

		editMenu: builder.mutation({
			query: ({ data, id }) => ({
				url: `/menus/${id}`,
				method: "PATCH",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				// TODO: fix category update

				const patchResult = dispatch(
					apiSlice.util.updateQueryData("getMenus", arg.params, (draft) => {
						const menu = draft.results.find((item) => item.id == arg.id);
						menu.name = arg.data.name;
						menu.category = arg.data.category;
						menu.slug = arg.data.slug;
						menu.description = arg.data.description;
						menu.price = arg.data.price;
						menu.offer_price = arg.data.offer_price;
						menu.cook_time = arg.data.cook_time;
						menu.image = arg.data.image;
						menu.updated_at = new Date();
						menu.is_active = arg.data.is_active;
					})
				);
				try {
					await queryFulfilled;
				} catch (err) {
					patchResult.undo();
				}
			},
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
