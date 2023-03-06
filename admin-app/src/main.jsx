import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./app/App";
import { store } from "./app/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<Provider store={store}>
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<BrowserRouter>
				<ToastContainer />
				<App />
			</BrowserRouter>
		</LocalizationProvider>
	</Provider>
	// </React.StrictMode>
);
