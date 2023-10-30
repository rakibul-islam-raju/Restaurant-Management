import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

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

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const res = await queryFulfilled;
					console.log("res =>", res.data);
					dispatch(userLoggedIn(res.data));
				} catch (err) {}
			},
		}),
		changePassword: builder.mutation({
			query: (data) => ({
				url: `/accounts/change-password`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetStaffsQuery,
	useGetUsersQuery,
	useLazyGetUsersQuery,
	useGetLoggedInUserQuery,
	useEditLoggedInUserMutation,
	useChangePasswordMutation,
} = usersApi;
