import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: (params) => `/categories`,
		}),

		addCategory: builder.mutation({
			query: ({ data }) => ({
				url: "/categories",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getCategories",
						arg.params,
						(draft) => {
							const newCategory = { ...arg.data };
							newCategory.id = draft.results[0] + 1;
							newCategory.created_at = new Date();
							newCategory.updated_at = new Date();
							newCategory.is_active = true;

							draft.results.unshift(newCategory);
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

		editCategory: builder.mutation({
			query: ({ data, id }) => ({
				url: `/categories/${id}`,
				method: "PATCH",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getCategories",
						arg.params,
						(draft) => {
							const category = draft.results.find((cat) => cat.id == arg.id);
							category.name = arg.data.name;
							category.slug = arg.data.slug;
							category.updated_at = new Date();
							category.is_active = arg.data.is_active;
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

		deleteCategory: builder.mutation({
			query: ({ id }) => ({
				url: `/categories/${id}`,
				method: "DELETE",
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getCategories",
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
	useGetCategoriesQuery,
	useAddCategoryMutation,
	useEditCategoryMutation,
	useDeleteCategoryMutation,
} = categoryApi;
