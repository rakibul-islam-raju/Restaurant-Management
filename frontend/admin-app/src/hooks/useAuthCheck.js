import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
	const dispatch = useDispatch();

	const [authChecked, setAuthChecked] = useState(false);

	useEffect(() => {
		const localAuth = localStorage?.getItem("takeMyOrder_auth");

		if (localAuth) {
			const auth = JSON.parse(localAuth);

			if (auth?.access && auth?.user && auth?.refresh) {
				dispatch(
					userLoggedIn({
						access: auth.access,
						refresh: auth.refresh,
						user: auth.user,
					})
				);
			}
		}

		setAuthChecked(true);
	}, [dispatch, setAuthChecked]);

	return authChecked;
}
