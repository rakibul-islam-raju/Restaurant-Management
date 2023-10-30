import { render as rtlRender } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../app/store";

export function render(ui, { preloadedState, ...renderOptions } = {}) {
	function Wrapper({ children }) {
		return (
			<Provider store={store}>
				<MemoryRouter>{children}</MemoryRouter>
			</Provider>
		);
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
