import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	access: undefined,
	refresh: undefined,
	user: undefined,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoggedIn: (state, { payload }) => {
			state.access = payload.access;
			state.refresh = payload.refresh;
			state.user = payload.user;

			localStorage.setItem(
				"takeMyOrder_auth",
				JSON.stringify({
					access: payload.access,
					refresh: payload.refresh,
					user: payload.user,
				})
			);
		},
		userLoggedOut: (state) => {
			state.access = undefined;
			state.refresh = undefined;
			state.user = undefined;
		},
	},
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
