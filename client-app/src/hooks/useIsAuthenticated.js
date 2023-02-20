import jwt_decode from "jwt-decode";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

const useIsAuthenticated = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const { access } = parseCookies(null, "access");
		if (access) {
			const userData = jwt_decode(access);
			setUser(userData);
		}
		setIsAuthenticated(!!access);
	}, []);

	return [isAuthenticated, user];
};

export default useIsAuthenticated;
