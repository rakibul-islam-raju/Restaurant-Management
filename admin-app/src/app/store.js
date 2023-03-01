import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import orderSliceReducer from "../features/orders/OrderSlice";
import themeSliceReducer from "../features/theme/themeSlice";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		theme: themeSliceReducer,
		auth: authSliceReducer,
		order: orderSliceReducer,
	},
	devTools: import.meta.env.DEV,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});
