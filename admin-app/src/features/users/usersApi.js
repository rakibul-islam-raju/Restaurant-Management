import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStaffs: builder.query({
			query: (params) => `/accounts/users?is_staff=true`,
		}),
	}),
});

export const { useGetStaffsQuery } = usersApi;
