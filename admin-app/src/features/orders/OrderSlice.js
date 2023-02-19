import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filters: {
		user__email: "",
		is_paid: "",
		is_served: "",
		is_active: "",
	},
	filterApplied: false,
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setFilter: (state, { payload }) => {
			const key = payload.key;
			const value = payload.value;
			state.filters[key] = value;
		},
		removeFilter: (state, { payload }) => {
			const key = payload.key;
			if (state.filters[key]) delete state.filters.key;
		},
		clearFilter: (state, { payload }) => {
			state.filters = {
				user__email: "",
				is_paid: "",
				is_served: "",
				is_active: "",
			};
			state.filterApplied = false;
		},
		applyFilter: (state, { payload }) => {
			state.filterApplied = payload;
		},
	},
});

export const { setFilter, removeFilter, clearFilter, applyFilter } =
	orderSlice.actions;
export default orderSlice.reducer;
