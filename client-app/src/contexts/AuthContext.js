import jwt_decode from "jwt-decode";
import { parseCookies, setCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [authChecked, setAuthChecked] = useState(false);

	useEffect(() => {
		console.log("start");
		const cookies = parseCookies();
		const token = cookies["access"];
		if (token) {
			const userData = jwt_decode(token);
			setUser(userData);
			setIsAuthenticated(true);
		}
		console.log("end");

		setAuthChecked(true);
	}, []);

	const login = (access, refresh) => {
		if (access && refresh) {
			setCookie(null, "access", access);
			setCookie(null, "refresh", refresh);

			const userData = jwt_decode(access);
			setUser(userData);
			setIsAuthenticated(true);
		}
	};

	const logout = () => {
		// logic to log out user and remove token from cookies
		setUser(null);
		setIsAuthenticated(false);
	};

	const value = {
		authChecked,
		isAuthenticated,
		user,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
