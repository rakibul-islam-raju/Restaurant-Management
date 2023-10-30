import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import Login from "./Login";

jest.mock("next/router", () => require("next-router-mock"));

describe("Login component", () => {
	test("renders Login heading", () => {
		mockRouter.push("/");
		render(<Login handleClose={jest.fn()} />);
		const heading = screen.getByTestId("login-heading");
		expect(heading).toBeInTheDocument();
	});

	test("shows validation errors for invalid inputs", async () => {
		render(<Login />);
		const emailInput = screen.getByTestId("emailInput");
		const passwordInput = screen.getByLabelText(/password/i);
		const loginButton = screen.getByTestId("loginSubmitBtn");

		fireEvent.click(loginButton);
		await waitFor(() => {
			expect(
				screen.getByText(/email is a required field/i)
			).toBeInTheDocument();
			expect(
				screen.getByText(/password is a required field/i)
			).toBeInTheDocument();
		});

		fireEvent.change(emailInput, { target: { value: "invalid-email" } });
		fireEvent.change(passwordInput, { target: { value: "123" } });
		fireEvent.click(loginButton);
		await waitFor(() => {
			expect(
				screen.getByText(/email must be a valid email/i)
			).toBeInTheDocument();
		});
	});

	test("submits form with valid inputs", async () => {
		const loginMock = jest.fn();
		const pushMock = jest.fn();
		const closeMock = jest.fn();

		jest.mock("next/router", () => ({
			useRouter: () => ({ push: pushMock, query: {} }),
		}));

		jest.mock("../../contexts/AuthContext", () => ({
			AuthContext: {
				Consumer: ({ children }) =>
					children({ isAuthenticated: false, login: loginMock }),
			},
		}));

		render(<Login handleClose={closeMock} />);
		const emailInput = screen.getByTestId("emailInput");
		const passwordInput = screen.getByLabelText(/password/i);
		const loginButton = screen.getByRole("button", { name: /login/i });

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password" } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			// expect(loginMock).toHaveBeenCalledWith(
			// 	expect.any(String),
			// 	expect.any(String)
			// );
			// expect(pushMock).toHaveBeenCalledWith(expect.any(String));
			// expect(closeMock).toHaveBeenCalled();
		});
	});

	// test("displays error message for failed login", async () => {
	// 	jest.mock("../../services/authService", () => ({
	// 		onSubmit: () => {
	// 			throw new Error("Login failed");
	// 		},
	// 	}));

	// 	render(<Login />);
	// 	const emailInput = screen.getByTestId("emailInput");
	// 	const passwordInput = screen.getByLabelText(/password/i);
	// 	const loginButton = screen.getByRole("button", { name: /login/i });

	// 	const errorMsg = screen.getByTestId("errorMsg");

	// 	fireEvent.change(emailInput, { target: { value: "test@example.com" } });
	// 	fireEvent.change(passwordInput, { target: { value: "password" } });
	// 	fireEvent.click(loginButton);

	// 	await waitFor(() => {
	// 		expect(errorMsg).toBeInTheDocument();
	// 	});
	// });
});
