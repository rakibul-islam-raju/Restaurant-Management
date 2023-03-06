import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStaffs: builder.query({
			query: (params) => ({
				url: `/accounts/users`,
				params: { ...params, is_staff: true },
			}),
		}),
		getUsers: builder.query({
			query: (params = {}) => ({
				url: `/accounts/users`,
				params,
			}),
		}),
		getLoggedInUser: builder.query({
			query: (email) => ({
				url: `/accounts/me/${email}`,
			}),
			providesTags: ["GetLoggedInUser"],
		}),
		editLoggedInUser: builder.mutation({
			query: ({ data, email }) => ({
				url: `/accounts/me/${email}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["GetLoggedInUser"],
		}),
	}),
});

export const {
	useGetStaffsQuery,
	useGetUsersQuery,
	useLazyGetUsersQuery,
	useGetLoggedInUserQuery,
	useEditLoggedInUserMutation,
} = usersApi;
