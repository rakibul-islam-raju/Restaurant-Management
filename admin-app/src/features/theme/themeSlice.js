import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	lightMode: true,
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleLightMode: (state, action) => {
			state.lightMode = !state.lightMode;
		},
	},
});

export const { toggleLightMode } = themeSlice.actions;
export default themeSlice.reducer;
