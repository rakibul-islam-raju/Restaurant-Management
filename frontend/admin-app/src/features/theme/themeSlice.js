import { createSlice } from "@reduxjs/toolkit";

const themeStateFromLocalStorage = localStorage.getItem(
	"_restaurant_management_theme"
)
	? JSON.parse(localStorage.getItem("_restaurant_management_theme"))
	: null;

const initialState = themeStateFromLocalStorage
	? themeStateFromLocalStorage
	: { lightMode: true };

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleLightMode: (state, action) => {
			state.lightMode = !state.lightMode;

			localStorage.setItem(
				"_restaurant_management_theme",
				JSON.stringify(state)
			);
		},
	},
});

export const { toggleLightMode } = themeSlice.actions;
export default themeSlice.reducer;
