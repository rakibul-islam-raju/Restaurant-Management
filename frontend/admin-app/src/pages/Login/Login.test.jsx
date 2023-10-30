import "@testing-library/jest-dom";
import { describe, test } from "vitest";
import { render } from "../../utils/testUtils";
import Login from "./Login";

describe("Login Page", () => {
	test("renders login page witout any errors", () => {
		render(<Login />);
	});
});
