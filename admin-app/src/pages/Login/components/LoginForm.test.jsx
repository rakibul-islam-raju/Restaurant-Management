import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import { render } from "../../../utils/testUtils";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
	test("renders email input", () => {
		render(<LoginForm />);
		const emailInput = screen.getByLabelText(/^Email Address/i);
		expect(emailInput).toBeInTheDocument();
	});

	test("renders password input", () => {
		render(<LoginForm />);
		const passwordInput = screen.getByLabelText(/^Password/i);
		expect(passwordInput).toBeInTheDocument();
	});

	test("renders submit button", () => {
		render(<LoginForm />);
		const submitButton = screen.getByRole("button", { name: "Sign In" });
		expect(submitButton).toBeInTheDocument();
	});

	test("displays error message if email input is empty", async () => {
		render(<LoginForm />);
		const submitButton = screen.getByRole("button", { name: "Sign In" });

		fireEvent.click(submitButton);
		const errorMessage = await screen.findByText(/email is a required field/i);
		expect(errorMessage).toBeInTheDocument();
	});

	test("displays error message if email input is invalid", async () => {
		render(<LoginForm />);
		const emailInput = screen.getByLabelText(/^Email Address/i);
		const submitButton = screen.getByRole("button", { name: "Sign In" });

		fireEvent.change(emailInput, { target: { value: "invalid-email" } });
		fireEvent.click(submitButton);

		const errorMessage = await screen.findByText(/must be a valid email/i);
		expect(errorMessage).toBeInTheDocument();
	});

	test("displays error message if password input is empty", async () => {
		render(<LoginForm />);
		const submitButton = screen.getByRole("button", { name: "Sign In" });

		fireEvent.click(submitButton);
		const errorMessage = await screen.findByText(
			/password is a required field/i
		);
		expect(errorMessage).toBeInTheDocument();
	});

	test("displays error message if password input is too short", async () => {
		render(<LoginForm />);
		const passwordInput = screen.getByLabelText(/^password/i);
		const submitButton = screen.getByRole("button", { name: "Sign In" });

		fireEvent.change(passwordInput, { target: { value: "123" } });
		fireEvent.click(submitButton);

		const errorMessage = await screen.findByText(
			/password must be at least 4 characters/i
		);
		expect(errorMessage).toBeInTheDocument();
	});
});
