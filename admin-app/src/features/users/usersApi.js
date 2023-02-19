import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStaffs: builder.query({
			query: (params) => `/accounts/users?is_staff=true`,
		}),
		getUsers: builder.query({
			query: (params = {}) => ({
				url: `/accounts/users`,
				params,
			}),
		}),
	}),
});

export const { useGetStaffsQuery, useGetUsersQuery, useLazyGetUsersQuery } =
	usersApi;
