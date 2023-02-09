import jwt_decode from "jwt-decode";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		registration: builder.mutation({
			query: (data) => ({
				url: "/accounts/registration",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;

					const decodedUserData = jwt_decode(data.access);
					localStorage.setItem(
						"takeMyOrder_auth",
						JSON.stringify({
							access: data.access,
							refresh: data.refresh,
							user: decodedUserData,
						})
					);

					dispatch(
						userLoggedIn({
							access: data.access,
							refresh: data.refresh,
							user: decodedUserData,
						})
					);
				} catch (err) {
					// do nothing
				}
			},
		}),

		login: builder.mutation({
			query: (data) => ({
				url: "/accounts/login",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;

					const decodedUserData = jwt_decode(data.access);

					localStorage.setItem(
						"takeMyOrder_auth",
						JSON.stringify({
							access: data.access,
							refresh: data.refresh,
							user: decodedUserData,
						})
					);

					dispatch(
						userLoggedIn({
							access: data.access,
							refresh: data.refresh,
							user: decodedUserData,
						})
					);
				} catch (err) {
					// do nothing
				}
			},
		}),
	}),
});

export const { useLoginMutation, useRegistrationMutation } = authApi;
